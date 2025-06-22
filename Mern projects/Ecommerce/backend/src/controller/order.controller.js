import { Order } from "../model/order.model.js";
import { Cart } from "../model/cart.model.js";
import { Product } from "../model/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Stripe from "stripe";

// Initialize Stripe only if API key is available
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

// Create new order
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const userId = req.user._id;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ success: false, message: "No order items." });
  }

  // Validate stock for each item
  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (!product) {
      return res
        .status(404)
        .json({
          success: false,
          message: `Product ${item.product} not found.`,
        });
    }
    if (product.stock < item.quantity) {
      return res
        .status(400)
        .json({
          success: false,
          message: `Insufficient stock for ${product.name}.`,
        });
    }
  }

  const order = await Order.create({
    user: userId,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  // Update product stock
  for (const item of orderItems) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: -item.quantity },
    });
  }

  // Clear user's cart
  await Cart.findOneAndUpdate({ user: userId }, { items: [] });

  await order.populate("orderItems.product");

  return res.status(201).json({
    success: true,
    message: "Order created successfully.",
    order,
  });
});

// Create payment intent for Stripe
const createPaymentIntent = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res
      .status(400)
      .json({ success: false, message: "Valid amount is required." });
  }

  // Check if Stripe is configured
  if (!stripe) {
    return res
      .status(500)
      .json({
        success: false,
        message:
          "Stripe is not configured. Please set STRIPE_SECRET_KEY in environment variables.",
      });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: "usd",
      metadata: {
        userId: req.user._id.toString(),
      },
    });

    return res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Payment intent creation failed." });
  }
});

// Update order to paid
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { paymentResult } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    return res
      .status(404)
      .json({ success: false, message: "Order not found." });
  }

  if (order.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ success: false, message: "Not authorized." });
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = paymentResult;

  const updatedOrder = await order.save();
  await updatedOrder.populate("orderItems.product");

  return res.status(200).json({
    success: true,
    message: "Order updated to paid.",
    order: updatedOrder,
  });
});

// Get user's orders
const getMyOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const orders = await Order.find({ user: userId }).populate(
    "orderItems.product"
  );

  return res.status(200).json({
    success: true,
    orders,
  });
});

// Get single order by ID
const getOrderById = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user._id;

  const order = await Order.findById(orderId).populate("orderItems.product");

  if (!order) {
    return res
      .status(404)
      .json({ success: false, message: "Order not found." });
  }

  // Check if user owns this order or is admin
  if (
    order.user.toString() !== userId.toString() &&
    req.user.role !== "admin"
  ) {
    return res.status(401).json({ success: false, message: "Not authorized." });
  }

  return res.status(200).json({
    success: true,
    order,
  });
});

// Admin: Get all orders
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate("user", "fullname email")
    .populate("orderItems.product");

  return res.status(200).json({
    success: true,
    orders,
  });
});

// Admin: Update order status
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    return res
      .status(404)
      .json({ success: false, message: "Order not found." });
  }

  if (status === "delivered") {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
  }

  order.status = status;
  const updatedOrder = await order.save();
  await updatedOrder.populate("orderItems.product");

  return res.status(200).json({
    success: true,
    message: "Order status updated successfully.",
    order: updatedOrder,
  });
});

// Admin: Delete order
const deleteOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId);

  if (!order) {
    return res
      .status(404)
      .json({ success: false, message: "Order not found." });
  }

  // Restore product stock if order is cancelled
  if (order.status === "cancelled") {
    for (const item of order.orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity },
      });
    }
  }

  await Order.findByIdAndDelete(orderId);

  return res.status(200).json({
    success: true,
    message: "Order deleted successfully.",
  });
});

export {
  createOrder,
  createPaymentIntent,
  updateOrderToPaid,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
};
