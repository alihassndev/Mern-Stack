import { asyncHandler } from "../utils/asyncHandler.js";
import { PickupRequest } from "../model/pickupRequest.model.js";
import { FoodDonation } from "../model/foodDonation.model.js";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendNotification } from "../utils/notifier.js";
import transporter from "../utils/transporter.js";
import { createNotification } from "./notification.controller.js";

// NGO creates pickup request
const createRequest = asyncHandler(async (req, res) => {
  const { donationId, proposedPickupTime, message, driverName, driverContact } = req.body;

  // Validate donation availability
  const donation = await FoodDonation.findById(donationId);
  if (!donation || donation.status !== "available") {
    throw new ApiError(400, "Donation not available for pickup");
  }

  // Validate pickup time is not after expiry date
  const pickupDate = new Date(proposedPickupTime);
  const expiryDate = new Date(donation.expiryDate);
  
  if (pickupDate > expiryDate) {
    throw new ApiError(400, "Pickup time cannot be after the food expiry date");
  }

  // Validate pickup time is not in the past
  const currentDate = new Date();
  if (pickupDate < currentDate) {
    throw new ApiError(400, "Pickup time cannot be in the past");
  }

  // Validate driver information
  if (!driverName || !driverContact) {
    throw new ApiError(400, "Driver name and contact are required");
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

  // Create pickup request with driver information
  const pickupRequest = await PickupRequest.create({
    donation: donationId,
    ngo: req.user._id,
    proposedPickupTime,
    message,
    driver: {
      name: driverName,
      contact: driverContact
    }
  });

  // Notify donor with driver details
  const donor = await User.findById(donation.donor);
  const emailTo = donor.email;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emailTo,
    subject: "New Pickup Request for Your Donation",
    text: `Hello ${donor.username},\n\nA new pickup request has been made for your donation titled '${donation.title}'.\n\nPickup Details:\n- Proposed Time: ${proposedPickupTime}\n- Driver Name: ${driverName}\n- Driver Contact: ${driverContact}\n- Message: ${message}\n\nPlease review the request on the platform.\n\nBest Regards,\nYour Donation Platform`,
  };

  await sendNotification({
    phone: donor.phone,
    email: donor.email,
    message: `New pickup request for your donation: ${donation.title}`,
  });

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to donor.");
  } catch (error) {
    console.error("Error sending email to donor:", error);
  }

  // Create notification for donor
  // Create notification for donor
  await createNotification({
    recipientId: donor._id,
    senderId: req.user._id,
    type: "pickup_request",
    title: "New Pickup Request",
    message: `${req.user.username} has requested to pickup your donation "${donation.title}". Driver: ${driverName} (${driverContact})`,
    data: {
      donationId: donation._id,
      pickupRequestId: pickupRequest._id,
      driverName,
      driverContact,
      proposedPickupTime
    },
    priority: "high",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, pickupRequest, "Pickup request created"));
});

// Donor accepts/rejects request - simplified
const updateRequestStatus = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;

  const request = await PickupRequest.findById(requestId)
    .populate("donation", "donor status title")
    .populate("ngo", "phone email username");

  if (!request) throw new ApiError(404, "Request not found");

  // Authorization check
  if (!request.donation.donor.equals(req.user._id)) {
    throw new ApiError(403, "Only the donor can process this request");
  }

  // Validate status transition
  if (!["accepted", "rejected", "completed"].includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  // Update request - no driver info needed from donor side
  request.status = status;
  await request.save();

  // Send notifications based on status
  if (status === "accepted") {
    await createNotification({
      recipientId: request.ngo._id,
      senderId: req.user._id,
      type: "pickup_accepted",
      title: "Pickup Request Accepted",
      message: `Your pickup request for "${request.donation.title}" has been accepted`,
      data: {
        donationId: request.donation._id,
        pickupRequestId: request._id,
      },
      priority: "high",
    });
  } else if (status === "rejected") {
    await createNotification({
      recipientId: request.ngo._id,
      senderId: req.user._id,
      type: "pickup_rejected",
      title: "Pickup Request Rejected",
      message: `Your pickup request for "${request.donation.title}" has been rejected`,
      data: {
        donationId: request.donation._id,
        pickupRequestId: request._id,
      },
      priority: "medium",
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, request, `Request ${status} successfully`));
});

// Update delivery location
const updateDeliveryLocation = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const { deliveryLocation } = req.body;

  const request = await PickupRequest.findById(requestId);
  if (!request) throw new ApiError(404, "Request not found");

  if (!request.ngo.equals(req.user._id)) {
    throw new ApiError(403, "Only the NGO can update delivery location");
  }

  request.deliveryLocation = deliveryLocation;
  await request.save();

  return res
    .status(200)
    .json(new ApiResponse(200, request, "Delivery location updated"));
});

// Complete pickup request
// Update the completeRequest function
// Current - allows both NGO and donor
const completeRequest = asyncHandler(async (req, res) => {
  const { requestId } = req.params;

  const request = await PickupRequest.findById(requestId)
    .populate("donation")
    .populate("ngo");

  if (!request) throw new ApiError(404, "Request not found");

  // Check if donation exists (it might have been deleted)
  if (!request.donation) {
    throw new ApiError(400, "Associated donation no longer exists. Cannot complete pickup.");
  }

  // Allow both NGO and donor to complete the request
  const isNGO = request.ngo._id.equals(req.user._id);
  const isDonor = request.donation.donor.equals(req.user._id);
  
  if (!isNGO && !isDonor) {
    throw new ApiError(403, "Only the NGO or donor can complete this request");
  }
  
  if (request.status !== "accepted") {
    throw new ApiError(400, "Request must be accepted before completion");
  }

  // Update request status
  request.status = "completed";
  request.completedAt = new Date();
  await request.save();

  // Update donation status only if donation still exists
  try {
    const donation = await FoodDonation.findById(request.donation._id);
    if (donation) {
      donation.status = "picked_up";
      await donation.save();
    }
  } catch (donationError) {
    console.error("Failed to update donation status:", donationError);
    // Continue with completion even if donation update fails
  }

  // Send notification to the other party
  try {
    const recipientId = isNGO ? request.donation.donor : request.ngo._id;
    await createNotification({
      recipientId,
      senderId: req.user._id,
      type: "pickup_completed",
      title: "Pickup Completed",
      message: `Pickup for "${request.donation.title}" has been marked as completed`,
      data: {
        donationId: request.donation._id,
        pickupRequestId: request._id,
      },
      priority: "high",
    });
  } catch (notificationError) {
    console.error("Failed to send notification:", notificationError);
    // Continue with completion even if notification fails
  }

  return res
    .status(200)
    .json(new ApiResponse(200, request, "Pickup completed"));
});

// Update the deleteRequest function
const deleteRequest = asyncHandler(async (req, res) => {
  const { requestId } = req.params;

  const request = await PickupRequest.findById(requestId).populate("donation");
  if (!request) throw new ApiError(404, "Request not found");

  // Check if donation exists (it might have been deleted)
  if (!request.donation) {
    // If donation is missing, just delete the pickup request
    await PickupRequest.findByIdAndDelete(requestId);
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Request deleted successfully"));
  }

  // Allow both NGO and donor to cancel the request
  const isNGO = request.ngo.equals(req.user._id);
  const isDonor = request.donation.donor.equals(req.user._id);
  
  if (!isNGO && !isDonor) {
    throw new ApiError(403, "Only the NGO or donor can cancel this request");
  }

  if (request.status === "completed") {
    throw new ApiError(400, "Cannot delete completed requests");
  }

  await PickupRequest.findByIdAndDelete(requestId);

  // Send notification to the other party only if donation exists
  try {
    const recipientId = isNGO ? request.donation.donor : request.ngo._id;
    await createNotification({
      recipientId,
      senderId: req.user._id,
      type: "pickup_cancelled",
      title: "Pickup Cancelled",
      message: `Pickup request for "${request.donation.title}" has been cancelled`,
      data: {
        donationId: request.donation._id,
        pickupRequestId: request._id,
      },
      priority: "medium",
    });
  } catch (notificationError) {
    // Log notification error but don't fail the deletion
    console.error("Failed to send notification:", notificationError);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Request deleted successfully"));
});

// Get all requests (with filtering)
const getAllRequests = asyncHandler(async (req, res) => {
  const { status, donationId, ngoId } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Build filter object
  const filter = {};
  if (status) filter.status = status;
  if (donationId) filter.donation = donationId;
  if (ngoId) filter.ngo = ngoId;

  // Role-based filtering
  if (req.user.role === "donor") {
    const donorDonations = await FoodDonation.find({
      donor: req.user._id,
    }).select("_id");
    filter.donation = { $in: donorDonations.map((d) => d._id) };
  } else if (req.user.role === "ngo") {
    filter.ngo = req.user._id;
  }

  const requests = await PickupRequest.find(filter)
    .populate("donation", "title description location donor")
    .populate("ngo", "username email phone")
    .populate("donation.donor", "username email phone")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await PickupRequest.countDocuments(filter);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {
          requests,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalRequests: total,
            hasNext: page < Math.ceil(total / limit),
            hasPrev: page > 1,
          },
        },
        "Requests retrieved successfully"
      )
    );
});

export {
  createRequest,
  updateRequestStatus,
  updateDeliveryLocation,
  completeRequest,
  getAllRequests,
  deleteRequest,
};
