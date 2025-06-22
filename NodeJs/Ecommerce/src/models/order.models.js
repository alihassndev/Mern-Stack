import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    orderItems: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    totalAmount: { type: Number },
    status: {
      type: String,
      enum: ["processing", "shipped", "delivered"],
      default: "processing",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
