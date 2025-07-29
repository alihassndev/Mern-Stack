import { asyncHandler } from "../utils/asyncHandler.js";
import { PickupRequest } from "../model/pickupRequest.model.js"; // Standardized path
import { FoodDonation } from "../model/foodDonation.model.js";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendNotification } from "../utils/notifier.js";
import transporter from "../utils/transporter.js";

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
   const emailTo = donor.email;

     const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: emailTo, // Recipient address (donor's email)
    subject: "New Pickup Request for Your Donation", // Subject line
    text: `Hello ${donor.username},\n\nA new pickup request has been made for your donation titled '${donation.title}'.\n\nProposed Pickup Time: ${proposedPickupTime}\n\nMessage: ${message}\n\nPlease review the request on the platform.\n\nBest Regards,\nYour Donation Platform`, // Plain text body
  };

  await sendNotification({
    phone: donor.phone,
    email: donor.email,
    message: `New pickup request for your donation: ${donation.title}`,
  });

   try {
    await transporter.sendMail(mailOptions); // Send the email
    console.log("Email sent successfully to donor.");
  } catch (error) {
    console.error("Error sending email to donor:", error);
  }

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
    .populate("ngo", "phone email username");

  if (!request) throw new ApiError(404, "Request not found");

  // Authorization check - UNCOMMENT AND FIX
  if (!request.donation.donor.equals(req.user._id)) {
    throw new ApiError(403, "Only the donor can process this request");
  }

  // Validate status transition
  if (!["accepted", "rejected", "completed"].includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  if (status === "accepted" && request.donation.status !== "available") {
    throw new ApiError(400, "Donation is no longer available");
  }

  // Validate driver info for accepted requests
  if (status === "accepted" && (!driverName || !driverContact)) {
    throw new ApiError(400, "Driver name and contact are required for accepted requests");
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

// Fetch all pickup requests with optional filtering, pagination, and sorting
const getAllRequests = asyncHandler(async (req, res) => {
  const {
    status,
    ngoId,
    donationId,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    order = "desc",
  } = req.query;

  // Build the query object
  const query = {};

  if (status) query.status = status; // Filter by status (pending, accepted, rejected, completed)
  if (ngoId) query.ngo = ngoId; // Filter by NGO ID
  if (donationId) query.donation = donationId; // Filter by donation ID

  // Build the sort object
  const sort = {};
  sort[sortBy] = order === "asc" ? 1 : -1; // Sort by specified field and order

  // Pagination logic: Limit and skip based on page and limit
  const skip = (page - 1) * limit;
  const limitValue = parseInt(limit, 10);

  // Find pickup requests based on the query and sort
  const requests = await PickupRequest.find(query)
    .populate("donation", "title status donor")
    .populate("ngo", "name phone email")
    .skip(skip)
    .limit(limitValue)
    .sort(sort);

  // Total count for pagination
  const totalRequests = await PickupRequest.countDocuments(query);

  // Return response with pagination details
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        requests,
        pagination: {
          totalRequests,
          totalPages: Math.ceil(totalRequests / limitValue),
          currentPage: page,
          perPage: limitValue,
        },
      },
      "Pickup requests retrieved successfully"
    )
  );
});

const deleteRequest = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  
  const request = await PickupRequest.findById(requestId)
    .populate("donation", "donor")
    .populate("ngo", "_id");
  
  if (!request) {
    throw new ApiError(404, "Pickup request not found");
  }
  
  // Authorization - admin, NGO who created request, or donation owner can delete
  const isAuthorized = 
    req.user.role === "admin" ||
    request.ngo._id.equals(req.user._id) ||
    request.donation.donor.equals(req.user._id);
  
  if (!isAuthorized) {
    throw new ApiError(403, "Not authorized to delete this pickup request");
  }
  
  // Don't allow deletion of completed requests
  if (request.status === "completed") {
    throw new ApiError(400, "Cannot delete completed pickup requests");
  }
  
  // If request was accepted, make donation available again
  if (request.status === "accepted") {
    await FoodDonation.findByIdAndUpdate(
      request.donation._id,
      { status: "available" }
    );
  }
  
  await PickupRequest.findByIdAndDelete(requestId);
  
  return res.status(200).json(
    new ApiResponse(200, null, "Pickup request deleted successfully")
  );
});

export {
  createRequest,
  updateRequestStatus,
  updateDeliveryLocation,
  completeRequest,
  getAllRequests,
  deleteRequest // Add this
};
