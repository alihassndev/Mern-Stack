import { Cart } from "../model/cart.model.js";
import { Product } from "../model/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Add item to cart
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const userId = req.user._id;

  if (!productId) {
    return res
      .status(400)
      .json({ success: false, message: "Product ID is required." });
  }

  // Check if product exists and has sufficient stock
  const product = await Product.findById(productId);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found." });
  }

  if (product.stock < quantity) {
    return res
      .status(400)
      .json({ success: false, message: "Insufficient stock." });
  }

  // Find or create cart for user
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }

  // Check if product already exists in cart
  const existingItemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (existingItemIndex > -1) {
    // Update quantity if product already exists
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    // Add new item to cart
    cart.items.push({
      product: productId,
      quantity,
      price: product.price,
    });
  }

  await cart.save();

  // Populate product details
  await cart.populate("items.product");

  return res.status(200).json({
    success: true,
    message: "Item added to cart successfully.",
    cart,
  });
});

// Get user's cart
const getCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId }).populate("items.product");

  if (!cart) {
    return res.status(200).json({
      success: true,
      message: "Cart is empty.",
      cart: { items: [], totalAmount: 0 },
    });
  }

  return res.status(200).json({
    success: true,
    cart,
  });
});

// Update cart item quantity
const updateCartItem = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  if (!productId || quantity === undefined) {
    return res.status(400).json({
      success: false,
      message: "Product ID and quantity are required.",
    });
  }

  if (quantity <= 0) {
    return res
      .status(400)
      .json({ success: false, message: "Quantity must be greater than 0." });
  }

  // Check product stock
  const product = await Product.findById(productId);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found." });
  }

  if (product.stock < quantity) {
    return res
      .status(400)
      .json({ success: false, message: "Insufficient stock." });
  }

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    return res.status(404).json({ success: false, message: "Cart not found." });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex === -1) {
    return res
      .status(404)
      .json({ success: false, message: "Item not found in cart." });
  }

  cart.items[itemIndex].quantity = quantity;
  await cart.save();

  await cart.populate("items.product");

  return res.status(200).json({
    success: true,
    message: "Cart updated successfully.",
    cart,
  });
});

// Remove item from cart
const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    return res.status(404).json({ success: false, message: "Cart not found." });
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  await cart.save();
  await cart.populate("items.product");

  return res.status(200).json({
    success: true,
    message: "Item removed from cart successfully.",
    cart,
  });
});

// Clear cart
const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    return res.status(404).json({ success: false, message: "Cart not found." });
  }

  cart.items = [];
  await cart.save();

  return res.status(200).json({
    success: true,
    message: "Cart cleared successfully.",
    cart,
  });
});

export { addToCart, getCart, updateCartItem, removeFromCart, clearCart };
