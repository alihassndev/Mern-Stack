import mongoose from "mongoose";

const PickupRequestSchema = new mongoose.Schema(
  {
    ngoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    donationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed"],
      default: "pending",
    },
    pickupTime: {
      type: Date,
    },
    feedback: {
      type: String,
    }, // NGO feedback after pickup
  },
  {
    timestamps: true,
  }
);

export const PickupRequest = mongoose.model(
  "PickupRequest",
  PickupRequestSchema
);
