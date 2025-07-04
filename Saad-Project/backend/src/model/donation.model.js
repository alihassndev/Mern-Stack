const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema(
  {
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    foodName: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["fruits", "bakery", "meals", "dairy"],
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    }, // For Google Maps
    status: {
      type: String,
      enum: ["available", "reserved", "collected"],
      default: "available",
    },
  },
  { timestamps: true }
);

export const Donation = mongoose.model("Donation", DonationSchema);
