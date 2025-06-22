import { Product } from "../model/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"; // adjust path if needed

// Create product
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  const user = req.user;

  // Validate required fields
  if (
    [name, description, price, category, stock].some(
      (field) => field === "" || field === undefined
    )
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  // Admin role check
  if (user.role !== "admin") {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access." });
  }

  // Check for uploaded files
  const files = req.files;
  if (!files || files.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "No product images provided." });
  }

  // Upload images to Cloudinary
  const images = [];
  for (const file of files) {
    const uploadedImage = await uploadOnCloudinary(file.path);
    if (uploadedImage?.url) {
      images.push({
        public_id: uploadedImage.public_id,
        url: uploadedImage.url,
      });
    }
  }

  if (images.length === 0) {
    return res
      .status(500)
      .json({ success: false, message: "Image upload failed." });
  }

  // Create product
  const product = await Product.create({
    name,
    description,
    price,
    category,
    stock,
    createdBy: user._id,
    images,
  });

  return res.status(201).json({
    success: true,
    message: "Product created successfully.",
    product,
  });
});

// Get all products (admin)
const getAllProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, category, search } = req.query;

  const query = {};

  // Filter by category
  if (category) {
    query.category = category;
  }

  // Search by name
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  const skip = (page - 1) * limit;

  const products = await Product.find(query)
    .populate("createdBy", "fullname")
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

  const total = await Product.countDocuments(query);

  return res.status(200).json({
    success: true,
    products,
    totalPages: Math.ceil(total / limit),
    currentPage: parseInt(page),
    total,
  });
});

// Get single product (admin)
const getProductById = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId).populate(
    "createdBy",
    "fullname"
  );

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found." });
  }

  return res.status(200).json({
    success: true,
    product,
  });
});

// Update product
const updateProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { name, description, price, category, stock } = req.body;
  const user = req.user;

  // Admin role check
  if (user.role !== "admin") {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access." });
  }

  const product = await Product.findById(productId);

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found." });
  }

  // Check if user is the creator of the product
  if (product.createdBy.toString() !== user._id.toString()) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to update this product.",
    });
  }

  // Handle image uploads if provided
  let images = product.images;
  const files = req.files;

  if (files && files.length > 0) {
    // Upload new images to Cloudinary
    const newImages = [];
    for (const file of files) {
      const uploadedImage = await uploadOnCloudinary(file.path);
      if (uploadedImage?.url) {
        newImages.push({
          public_id: uploadedImage.public_id,
          url: uploadedImage.url,
        });
      }
    }

    if (newImages.length > 0) {
      images = newImages;
    }
  }

  // Update product
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      name: name || product.name,
      description: description || product.description,
      price: price || product.price,
      category: category || product.category,
      stock: stock !== undefined ? stock : product.stock,
      images,
    },
    { new: true }
  ).populate("createdBy", "fullname");

  return res.status(200).json({
    success: true,
    message: "Product updated successfully.",
    product: updatedProduct,
  });
});

// Delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const user = req.user;

  // Admin role check
  if (user.role !== "admin") {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access." });
  }

  const product = await Product.findById(productId);

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found." });
  }

  // Check if user is the creator of the product
  if (product.createdBy.toString() !== user._id.toString()) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to delete this product.",
    });
  }

  await Product.findByIdAndDelete(productId);

  return res.status(200).json({
    success: true,
    message: "Product deleted successfully.",
  });
});

// Add product review
const addProductReview = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { rating, comment } = req.body;
  const user = req.user;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid rating (1-5).",
    });
  }

  const product = await Product.findById(productId);

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found." });
  }

  // Check if user already reviewed this product
  const alreadyReviewed = product.reviews.find(
    (review) => review.user.toString() === user._id.toString()
  );

  if (alreadyReviewed) {
    return res
      .status(400)
      .json({ success: false, message: "Product already reviewed." });
  }

  const review = {
    user: user._id,
    name: user.fullname,
    rating: Number(rating),
    comment,
  };

  product.reviews.push(review);
  product.numOfReviews = product.reviews.length;

  // Calculate average rating
  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save();

  return res.status(200).json({
    success: true,
    message: "Review added successfully.",
  });
});

// Get product reviews
const getProductReviews = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId).populate(
    "reviews.user",
    "fullname"
  );

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found." });
  }

  return res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addProductReview,
  getProductReviews,
};
