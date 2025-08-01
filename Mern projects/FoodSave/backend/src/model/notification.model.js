import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // System notifications won't have a sender
    },
    type: {
      type: String,
      enum: [
        "pickup_request",
        "pickup_accepted",
        "pickup_rejected",
        "pickup_completed",
        "donation_expired",
        "system_announcement",
        "feedback_received"
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    data: {
      donationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodDonation",
      },
      pickupRequestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PickupRequest",
      },
      // Additional data can be stored here
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
  },
  { timestamps: true }
);

// Index for efficient queries
notificationSchema.index({ recipient: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, isRead: 1 });

export const Notification = mongoose.model("Notification", notificationSchema);