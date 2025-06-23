import { Product } from "../models/product.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { deleteFromCloudinary } from "../utils/deleteFromCloudinary.js";

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock, category } = req.body;
  const user = req.user;

  if (
    [name, description, price, category].some(
      (field) => field === "" || field === undefined
    )
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
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

const updateProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const {
    name,
    description,
    price,
    stock,
    category,
    removeImageIds = [],
  } = req.body;

  // Build update object
  const updates = {};
  if (name) updates.name = name;
  if (description) updates.description = description;
  if (price) updates.price = price;
  if (stock) updates.stock = stock;
  if (category) updates.category = category;

  // Get existing product
  const product = await Product.findById(productId);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found." });
  }

  // Filter out images to be removed
  const existingImages = product.images.filter(
    (img) => !removeImageIds.includes(img.public_id)
  );

  // Optional: Delete removed images from Cloudinary
  for (const public_id of removeImageIds) {
    await deleteFromCloudinary(public_id);
  }

  // Handle newly uploaded images
  const newImages = [];
  const files = req.files;

  if (files && files.length > 0) {
    for (const file of files) {
      const uploaded = await uploadOnCloudinary(file.path);
      if (uploaded?.url) {
        newImages.push({
          public_id: uploaded.public_id,
          url: uploaded.url,
        });
      }
    }
  }

  // Merge kept existing + new images
  updates.images = [...existingImages, ...newImages];

  // Update product
  const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
    new: true,
  });

  return res.status(200).json({
    success: true,
    message: "Product updated successfully.",
    product: updatedProduct,
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  const deletedProduct = await Product.findByIdAndDelete(productId);

  for (const img of deletedProduct.images) {
    await deleteFromCloudinary(img.public_id);
  }

  if (!deletedProduct) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found." });
  }

  return res
    .status(200)
    .json({ success: true, message: "Product deleted successfully." });
});

const getSingleProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  const product = await Product.findById(productId);

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found." });
  }

  return res
    .status(200)
    .json({ success: true, message: "Product fetched successfully.", product });
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  return res
    .status(200)
    .json({ success: true, message: `${products.length} products found.` });
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["processing", "shipped", "delivered"].includes(status)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid status value." });
  }

  const order = await Order.findById(id);

  if (!order) {
    return res
      .status(404)
      .json({ success: false, message: "Order not found." });
  }

  order.status = status;
  await order.save();

  return res.status(200).json({
    success: true,
    message: "Order status updated.",
    order,
  });
});

const getAdminDashboard = asyncHandler(async (req, res) => {
  const [userCount, orderCount, totalRevenue, ordersByStatus] =
    await Promise.all([
      User.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),
      Order.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
    ]);

  res.status(200).json({
    success: true,
    stats: {
      users: userCount,
      orders: orderCount,
      revenue: totalRevenue[0]?.total || 0,
      statusSummary: ordersByStatus,
    },
  });
});

const searchProducts = asyncHandler(async (req, res) => {
  const { keyword, category } = req.query;

  const filter = {};
  if (keyword) {
    filter.name = { $regex: keyword, $options: "i" };
  }
  if (category) {
    filter.category = category;
  }

  const products = await Product.find(filter);

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});

export {
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  getAllProducts,
  updateOrderStatus,
  getAdminDashboard,
  searchProducts,
};
