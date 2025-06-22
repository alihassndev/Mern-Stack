import { Product } from "../model/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Get all products (public)
const getAllProducts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 12,
    category,
    search,
    minPrice,
    maxPrice,
    sort,
  } = req.query;

  const query = {};

  // Filter by category
  if (category) {
    query.category = category;
  }

  // Search by name
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  // Filter by price range
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = parseFloat(minPrice);
    if (maxPrice) query.price.$lte = parseFloat(maxPrice);
  }

  const skip = (page - 1) * limit;

  // Sort options
  let sortOption = { createdAt: -1 };
  if (sort === "price_asc") sortOption = { price: 1 };
  if (sort === "price_desc") sortOption = { price: -1 };
  if (sort === "rating") sortOption = { ratings: -1 };
  if (sort === "newest") sortOption = { createdAt: -1 };

  const products = await Product.find(query)
    .skip(skip)
    .limit(parseInt(limit))
    .sort(sortOption);

  const total = await Product.countDocuments(query);

  return res.status(200).json({
    success: true,
    products,
    totalPages: Math.ceil(total / limit),
    currentPage: parseInt(page),
    total,
  });
});

// Get single product (public)
const getProductById = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);

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

// Get product categories
const getProductCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct("category");

  return res.status(200).json({
    success: true,
    categories,
  });
});

// Get featured products (top rated)
const getFeaturedProducts = asyncHandler(async (req, res) => {
  const { limit = 8 } = req.query;

  const products = await Product.find({ ratings: { $gte: 4 } })
    .sort({ ratings: -1, numOfReviews: -1 })
    .limit(parseInt(limit));

  return res.status(200).json({
    success: true,
    products,
  });
});

// Get new arrivals
const getNewArrivals = asyncHandler(async (req, res) => {
  const { limit = 8 } = req.query;

  const products = await Product.find()
    .sort({ createdAt: -1 })
    .limit(parseInt(limit));

  return res.status(200).json({
    success: true,
    products,
  });
});

// Get products by category
const getProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const { page = 1, limit = 12, sort } = req.query;

  const query = { category };

  const skip = (page - 1) * limit;

  // Sort options
  let sortOption = { createdAt: -1 };
  if (sort === "price_asc") sortOption = { price: 1 };
  if (sort === "price_desc") sortOption = { price: -1 };
  if (sort === "rating") sortOption = { ratings: -1 };

  const products = await Product.find(query)
    .skip(skip)
    .limit(parseInt(limit))
    .sort(sortOption);

  const total = await Product.countDocuments(query);

  return res.status(200).json({
    success: true,
    products,
    totalPages: Math.ceil(total / limit),
    currentPage: parseInt(page),
    total,
  });
});

export {
  getAllProducts,
  getProductById,
  getProductCategories,
  getFeaturedProducts,
  getNewArrivals,
  getProductsByCategory,
};
