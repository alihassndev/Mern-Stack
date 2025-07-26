import { asyncHandler } from "../utils/asyncHandler.js";
import { PickupRequest } from "../model/pickupRequest.model.js"; // Standardized path
import { FoodDonation } from "../model/foodDonation.model.js";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendNotification } from "../utils/notifier.js";

// NGO creates pickup request
const createRequest = asyncHandler(async (req, res) => {
  const { donationId, proposedPickupTime, message } = req.body;

  // Validate donation availability
  const donation = await FoodDonation.findById(donationId);
  if (!donation || donation.status !== "available") {
    throw new ApiError(400, "Donation not available for pickup");
  }

  // Prevent duplicate requests
  const existingRequest = await PickupRequest.findOne({
    donation: donationId,
    ngo: req.user._id,
    status: { $in: ["pending", "accepted"] },
  });
  if (existingRequest) {
    throw new ApiError(400, "Active request already exists");
  }

  const request = await PickupRequest.create({
    donation: donationId,
    ngo: req.user._id,
    proposedPickupTime,
    message,
    status: "pending",
  });

  // Notify donor
  const donor = await User.findById(donation.donor);
  await sendNotification({
    phone: donor.phone,
    email: donor.email,
    message: `New pickup request for your donation: ${donation.title}`,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, request, "Pickup request created"));
});

// Donor accepts/rejects request
const updateRequestStatus = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const { status, driverName, driverContact } = req.body;

  const request = await PickupRequest.findById(requestId)
    .populate("donation", "donor status title")
    .populate("ngo", "phone email");

  if (!request) throw new ApiError(404, "Request not found");

  // Authorization
  if (!request.donation.donor.equals(req.user._id)) {
    throw new ApiError(403, "Only the donor can process this request");
  }

  // Validate status transition
  if (!["accepted", "rejected"].includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  if (status === "accepted" && request.donation.status !== "available") {
    throw new ApiError(400, "Donation is no longer available");
  }

  // Update request
  const updatedRequest = await PickupRequest.findByIdAndUpdate(
    requestId,
    {
      status,
      ...(status === "accepted" && {
        driver: {
          name: driverName,
          contact: driverContact,
        },
      }),
    },
    { new: true }
  );

  // Update donation status if accepted
  if (status === "accepted") {
    await FoodDonation.findByIdAndUpdate(request.donation._id, {
      status: "reserved",
    });
  }

  // Notify NGO
  await sendNotification({
    phone: request.ngo.phone,
    email: request.ngo.email,
    message: `Your request for "${request.donation.title}" was ${status}`,
  });

  // Notify driver if accepted
  if (status === "accepted") {
    await sendNotification({
      phone: driverContact,
      message: `You've been assigned to pickup: ${request.donation.title}`,
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedRequest, "Request status updated"));
});

// Driver updates location
const updateDeliveryLocation = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const { latitude, longitude } = req.body;

  // Verify driver
  const request = await PickupRequest.findOne({
    _id: requestId,
    "driver.contact": req.user.phone,
  });

  if (!request) {
    throw new ApiError(403, "Only assigned driver can update location");
  }

  // Broadcast real-time update
  const io = req.app.get("io");
  io.to(`pickup_${requestId}`).emit("location-update", {
    coordinates: [longitude, latitude], // GeoJSON format
    updatedAt: new Date(),
  });

  return res.status(200).json(new ApiResponse(200, null, "Location updated"));
});

// Mark pickup as completed
const completeRequest = asyncHandler(async (req, res) => {
  const { requestId } = req.params;

  const request = await PickupRequest.findByIdAndUpdate(
    requestId,
    {
      status: "completed",
      completionTime: new Date(),
    },
    { new: true }
  )
    .populate("donation", "donor title")
    .populate("ngo", "phone email");

  if (!request) throw new ApiError(404, "Request not found");

  // Update donation status
  await FoodDonation.findByIdAndUpdate(request.donation._id, {
    status: "collected",
  });

  // Notify donor and NGO
  await Promise.all([
    sendNotification({
      phone: request.donation.donor.phone,
      message: `Pickup completed for: ${request.donation.title}`,
    }),
    sendNotification({
      phone: request.ngo.phone,
      message: `Your pickup is complete! Thank you.`,
    }),
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, request, "Pickup completed"));
});

export {
  createRequest,
  updateRequestStatus,
  updateDeliveryLocation,
  completeRequest,
};
