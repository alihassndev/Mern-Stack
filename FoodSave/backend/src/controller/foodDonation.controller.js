import { asyncHandler } from "../utils/asyncHandler.js";
import { FoodDonation } from "../model/foodDonation.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// const createFoodDonation = asyncHandler(async (req, res) => {
//   console.log(req.files);
//   const {
//     title,
//     description,
//     quantity,
//     category,
//     expiryDate,
//     address,
//     coordinates,
//     pickupWindow,
//   } = req.body;

//   // Validate required fields
//   // if (
//   //   [title, quantity, category, expiryDate, address, coordinates].some(
//   //     (field) => !field
//   //   )
//   // ) {
//   //   throw new ApiError(400, "All required fields must be provided");
//   // }

//   // Image upload handling
//   // const imageFiles = req.files?.images;
//   const imageFiles = req.files;
//   if (!imageFiles || imageFiles.length === 0) {
//     throw new ApiError(400, "At least one food image is required");
//   }

//   const imageUrls = [];
//   for (const file of imageFiles) {
//     const url = await uploadOnCloudinary(file.path);
//     if (url) imageUrls.push(url);
//   }

//   // if (imageUrls.length === 0) {
//   //   throw new ApiError(500, "Failed to upload images");
//   // }

//   // Create donation
//   const donation = await FoodDonation.create({
//     donor: req.user._id,
//     title,
//     description,
//     quantity,
//     category,
//     expiryDate,
//     images: imageUrls,
//     location: {
//       address,
//       coordinates: JSON.parse(coordinates),
//     },
//     pickupWindow: JSON.parse(pickupWindow),
//     status: "available",
//   });

//   return res
//     .status(201)
//     .json(new ApiResponse(201, donation, "Food donation created successfully"));
// });

const createFoodDonation = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    quantity,
    category,
    expiryDate,
    address,
    coordinates,
    pickupWindow,
  } = req.body;

  // Validate required fields
  // if ([title, quantity, category, expiryDate, address, coordinates].some((field) => !field)) {
  //   throw new ApiError(400, "All required fields must be provided");
  // }

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

  // Check if coordinates is provided and is a valid string before parsing
  let parsedCoordinates = null;
  if (coordinates) {
    try {
      parsedCoordinates = JSON.parse(coordinates);
    } catch (error) {
      throw new ApiError(400, "Invalid coordinates format");
    }
  }

  // Check if pickupWindow is provided and is a valid string before parsing
  let parsedPickupWindow = null;
  if (pickupWindow) {
    try {
      parsedPickupWindow = JSON.parse(pickupWindow);
    } catch (error) {
      throw new ApiError(400, "Invalid pickup window format");
    }
  }

  // Create donation
  const donation = await FoodDonation.create({
    donor: req.user._id,
    title,
    description,
    quantity,
    category,
    expiryDate,
    images: imageUrls,
    location: {
      address,
      coordinates: parsedCoordinates, // use the parsed coordinates here
    },
    pickupWindow: parsedPickupWindow, // use the parsed pickup window here
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
    if (status.includes(',')) {
      // Multiple statuses: "available,expired"
      query.status = { $in: status.split(',') };
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
  if (!donation) throw new ApiError(404, "Donation not found");
  if (!donation.donor.equals(req.user._id)) {
    throw new ApiError(403, "Only the donor can delete this listing");
  }
});

export {
  createFoodDonation,
  getDonations,
  getDonationById,
  updateDonation,
  deleteDonation,
};
