import { asyncHandler } from "../utils/asyncHandler.js";
import { PickupRequest } from "../models/pickupRequest.model.js";
import { FoodDonation } from "../models/foodDonation.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// NGO creates request
const createRequest = asyncHandler(async (req, res) => {
  const { donationId, proposedPickupTime, message } = req.body;

  // Verify donation exists and is available
  const donation = await FoodDonation.findById(donationId);
  if (!donation || donation.status !== "available") {
    throw new ApiError(400, "Donation not available for pickup");
  }

  // Prevent duplicate requests
  const existingRequest = await PickupRequest.findOne({
    donation: donationId,
    ngo: req.user._id,
  });
  if (existingRequest) {
    throw new ApiError(400, "You already requested this donation");
  }

  const request = await PickupRequest.create({
    donation: donationId,
    ngo: req.user._id,
    proposedPickupTime,
    message,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, request, "Pickup request created"));
});

// Donor accepts/rejects request
const updateRequestStatus = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const { status, driverDetails } = req.body;

  const request = await PickupRequest.findById(requestId).populate(
    "donation",
    "donor status"
  );

  if (!request) throw new ApiError(404, "Request not found");

  // Verify donor ownership
  if (!request.donation.donor.equals(req.user._id)) {
    throw new ApiError(403, "Only the donor can process this request");
  }

  // Status transition validation
  if (status === "accepted" && request.donation.status !== "available") {
    throw new ApiError(400, "Donation is no longer available");
  }

  const updatedRequest = await PickupRequest.findByIdAndUpdate(
    requestId,
    {
      status,
      ...(status === "accepted" && { driver: driverDetails }),
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedRequest, "Request status updated"));
});

// Mark request as completed
const completeRequest = asyncHandler(async (req, res) => {
  const { requestId } = req.params;

  const request = await PickupRequest.findByIdAndUpdate(
    requestId,
    {
      status: "completed",
      completionTime: new Date(),
    },
    { new: true }
  );

  // Update donation status
  await FoodDonation.updateOne(
    { _id: request.donation },
    { $set: { status: "collected" } }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, request, "Pickup completed"));
});

// Add to your existing pickup controller
const updateDeliveryLocation = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const { latitude, longitude } = req.body;

  // Verify driver
  const request = await PickupRequest.findOne({
    _id: requestId,
    "driver.contact": req.user.phone, // Assuming phone is stored in user
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

// Add to exports
export {
  createRequest,
  updateRequestStatus,
  completeRequest,
  updateDeliveryLocation,
};
