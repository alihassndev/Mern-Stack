import mongoose from "mongoose";

const foodDonationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true, min: 1 },
    category: {
      type: String,
      enum: ["fruits", "vegetables", "bakery", "meals", "dairy", "other"],
      required: true,
    },
    expiryDate: { type: Date, required: true },
    images: [{ type: String }], // Cloudinary URLs
    location: {
      address: { type: String, required: true },
      coordinates: { type: [Number], required: true }, // [longitude, latitude]
    },
    status: {
      type: String,
      enum: ["available", "reserved", "collected", "expired"],
      default: "available",
    },
    pickupWindow: {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },
  },
  { timestamps: true }
);

// Auto-update status when expiry date passes
foodDonationSchema.pre("save", function (next) {
  if (this.expiryDate < new Date() && this.status !== "collected") {
    this.status = "expired";
  }
  next();
});

export const FoodDonation = mongoose.model("FoodDonation", foodDonationSchema);
