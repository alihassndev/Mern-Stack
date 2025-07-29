import { asyncHandler } from "../utils/asyncHandler.js";
import { FoodDonation } from "../model/foodDonation.model.js";
import { PickupRequest } from "../model/pickupRequest.model.js"; // Add this line
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import transporter from "../utils/transporter.js";
import { User } from "../model/user.model.js";

const createFoodDonation = asyncHandler(async (req, res) => {
  const {
    title,
    foodName, // Support legacy field name
    description,
    quantity,
    category,
    expiryDate,
    address,
    pickupLocation, // Support legacy field name
    coordinates,
    pickupWindow,
  } = req.body;

  // Use title or fallback to foodName for backward compatibility
  const donationTitle = title || foodName;
  const donationAddress = address || pickupLocation;

  // Validate required fields
  if (!donationTitle || !quantity || !expiryDate) {
    throw new ApiError(400, "Title, quantity, and expiry date are required");
  }

  if (quantity < 1) {
    throw new ApiError(400, "Quantity must be at least 1");
  }

  if (new Date(expiryDate) <= new Date()) {
    throw new ApiError(400, "Expiry date must be in the future");
  }

  // Image upload handling
  const imageFiles = req.files;
  if (!imageFiles || imageFiles.length === 0) {
    throw new ApiError(400, "At least one food image is required");
  }

  const imageUrls = [];
  for (const file of imageFiles) {
    const url = await uploadOnCloudinary(file.path);
    if (url) imageUrls.push(url);
  }

  if (imageUrls.length === 0) {
    throw new ApiError(500, "Failed to upload images");
  }

  // Parse coordinates and pickup window safely
  let parsedCoordinates = [0, 0]; // Default coordinates
  if (coordinates) {
    try {
      parsedCoordinates = JSON.parse(coordinates);
      if (!Array.isArray(parsedCoordinates) || parsedCoordinates.length !== 2) {
        throw new Error("Invalid format");
      }
    } catch (error) {
      throw new ApiError(
        400,
        "Invalid coordinates format. Expected [longitude, latitude]"
      );
    }
  }

  let parsedPickupWindow = null;
  if (pickupWindow) {
    try {
      parsedPickupWindow = JSON.parse(pickupWindow);
      if (parsedPickupWindow.start && parsedPickupWindow.end) {
        if (
          new Date(parsedPickupWindow.start) >= new Date(parsedPickupWindow.end)
        ) {
          throw new ApiError(
            400,
            "Pickup window start time must be before end time"
          );
        }
      }
    } catch (error) {
      throw new ApiError(400, "Invalid pickup window format");
    }
  }

  // Create donation
  const donation = await FoodDonation.create({
    donor: req.user._id,
    title: donationTitle,
    description,
    quantity: parseInt(quantity),
    category: category || "meals",
    expiryDate,
    images: imageUrls,
    location: {
      address: donationAddress,
      coordinates: parsedCoordinates,
    },
    pickupWindow: parsedPickupWindow,
    status: "available",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, donation, "Food donation created successfully"));
});

// Add other CRUD operations (get, update, delete) here
const getDonations = asyncHandler(async (req, res) => {
  const {
    category,
    status,
    minQuantity,
    location,
    radius = 10, // Default 10km radius
  } = req.query;

  // Base query - if no status specified, show all
  const query = {};

  // Handle status filtering
  if (status) {
    if (status.includes(",")) {
      // Multiple statuses: "available,expired"
      query.status = { $in: status.split(",") };
    } else {
      // Single status
      query.status = status;
    }
  }

  if (category) query.category = category;
  if (minQuantity) query.quantity = { $gte: Number(minQuantity) };

  // Geo query
  if (location) {
    const [lng, lat] = JSON.parse(location);
    query.location.coordinates = {
      $near: {
        $geometry: { type: "Point", coordinates: [lng, lat] },
        $maxDistance: radius * 1000, // Convert km to meters
      },
    };
  }

  const donations = await FoodDonation.find(query)
    .populate("donor", "username email")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, donations, "Donations retrieved"));
});

const getDonationById = asyncHandler(async (req, res) => {
  const donation = await FoodDonation.findById(req.params.id).populate(
    "donor",
    "username email"
  );

  if (!donation) {
    throw new ApiError(404, "Donation not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, donation, "Donation details"));
});

const updateDonation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const newImages = req.files?.images;

  // Verify ownership
  const donation = await FoodDonation.findById(id);
  if (!donation) throw new ApiError(404, "Donation not found");
  if (!donation.donor.equals(req.user._id)) {
    throw new ApiError(403, "Only the donor can update this listing");
  }

  // Handle new images
  if (newImages && newImages.length > 0) {
    const imageUrls = [];
    for (const file of newImages) {
      const url = await uploadOnCloudinary(file.path);
      if (url) imageUrls.push(url);
    }
    updateData.images = [...donation.images, ...imageUrls].slice(0, 5); // Keep max 5 images
  }

  // Auto-update status if expiry changed
  if (updateData.expiryDate) {
    const newExpiry = new Date(updateData.expiryDate);
    if (newExpiry < new Date()) updateData.status = "expired";
  }

  const updatedDonation = await FoodDonation.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedDonation, "Donation updated"));
});

const deleteDonation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const donation = await FoodDonation.findById(id);

  if (!donation) {
    throw new ApiError(404, "Donation not found");
  }

  // Check authorization - admin can delete any donation, donor can delete their own
  if (req.user.role !== "admin" && !donation.donor.equals(req.user._id)) {
    throw new ApiError(403, "Only the donor or admin can delete this donation");
  }

  // Check if donation has active pickup requests
  const activePickups = await PickupRequest.find({
    donation: id,
    status: { $in: ["pending", "accepted"] },
  });

  if (activePickups.length > 0) {
    throw new ApiError(
      400,
      "Cannot delete donation with active pickup requests"
    );
  }

  await FoodDonation.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Donation deleted successfully"));
});

// Controller to change the status of the donation
const updateDonationStatus = asyncHandler(async (req, res) => {
  const { id } = req.params; // Donation ID from URL params
  const { status } = req.body; // New status from request body

  // Validate that the status is one of the allowed values
  const validStatuses = [
    "available",
    "reserved",
    "collected",
    "expired",
    "delivered",
  ];
  if (!validStatuses.includes(status)) {
    throw new ApiError(400, "Invalid status value");
  }

  // Find the donation by ID
  const donation = await FoodDonation.findById(id);
  if (!donation) {
    throw new ApiError(404, "Donation not found");
  }

  // Optionally, check if the current user is the donor before allowing status update
  // if (!donation.donor.equals(req.user._id)) {
  //   throw new ApiError(403, "Only the donor can update the status");
  // }

  // Update the donation status
  donation.status = status;
  await donation.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, donation, "Donation status updated successfully")
    );
});

const getDonationStats = asyncHandler(async (req, res) => {
  const stats = await FoodDonation.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
        totalQuantity: { $sum: "$quantity" },
      },
    },
  ]);

  const categoryStats = await FoodDonation.aggregate([
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { statusStats: stats, categoryStats },
        "Statistics fetched successfully"
      )
    );
});

export {
  createFoodDonation,
  getDonations,
  getDonationById,
  updateDonation,
  deleteDonation,
  updateDonationStatus,
  getDonationStats, // Add this
};
