import { Cart } from "../models/cart.models.js";
import { Product } from "../models/product.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  // Validate product exists
  const product = await Product.findById(productId);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  // Get or create user's cart
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }

  // Check if product already in cart
  const existingItemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (existingItemIndex >= 0) {
    // Update quantity
    cart.items[existingItemIndex].quantity += parseInt(quantity);
  } else {
    // Add new item
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();

  return res.status(200).json({
    success: true,
    message: "Product added to cart",
    cart,
  });
});

const updateCartItem = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  if (!productId || !quantity || quantity < 1) {
    return res.status(400).json({
      success: false,
      message: "Product ID and valid quantity are required.",
    });
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

  return res.status(200).json({
    success: true,
    message: "Cart item updated.",
    cart,
  });
});

const removeCartItem = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return res.status(404).json({ success: false, message: "Cart not found." });
  }

  const initialLength = cart.items.length;

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  if (cart.items.length === initialLength) {
    return res
      .status(404)
      .json({ success: false, message: "Item not found in cart." });
  }

  await cart.save();

  return res.status(200).json({
    success: true,
    message: "Item removed from cart.",
    cart,
  });
});

const getUserCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    return res.status(200).json({
      success: true,
      message: "Your cart is empty.",
      cart: [],
    });
  }

  return res.status(200).json({
    success: true,
    message: "Cart fetched successfully.",
    cart,
  });
});

export { addToCart, updateCartItem, removeCartItem, getUserCart };
