import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    pickupRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PickupRequest",
      required: true,
    },
    ngo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, maxlength: 1000 },
  },
  { timestamps: true }
);

export const Feedback = mongoose.model("Feedback", feedbackSchema);
