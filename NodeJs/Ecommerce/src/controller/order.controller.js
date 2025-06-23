import { Cart } from "../models/cart.models.js";
import { Order } from "../models/order.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const placeOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ success: false, message: "Cart is empty." });
  }

  // Calculate total amount
  let totalAmount = 0;
  const orderItems = cart.items.map((item) => {
    totalAmount += item.product.price * item.quantity;

    return {
      product: item.product._id,
      quantity: item.quantity,
    };
  });

  // Create new order
  const order = await Order.create({
    user: userId,
    orderItems,
    totalAmount,
  });

  // Clear user's cart
  cart.items = [];
  await cart.save();

  return res.status(201).json({
    success: true,
    message: "Order placed successfully.",
    order,
  });
});

const getMyOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const orders = await Order.find({ user: userId })
    .populate("orderItems.product", "name price images") // fetch product details
    .sort({ createdAt: -1 }); // newest first

  return res.status(200).json({
    success: true,
    message: `${orders.length} orders found.`,
    orders,
  });
});

const getOrderById = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const orderId = req.params.id;

  const order = await Order.findById(orderId)
    .populate("orderItems.product", "name price images")
    .populate("user", "name email");

  if (!order) {
    return res
      .status(404)
      .json({ success: false, message: "Order not found." });
  }

  // Allow only the user who placed it OR admin
  if (
    order.user._id.toString() !== userId.toString() &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({ success: false, message: "Access denied." });
  }

  return res.status(200).json({
    success: true,
    order,
  });
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("orderItems.product", "name price");

  return res.status(200).json({
    success: true,
    message: `${orders.length} orders found.`,
    orders,
  });
});

export { placeOrder, getMyOrders, getOrderById, getAllOrders };
