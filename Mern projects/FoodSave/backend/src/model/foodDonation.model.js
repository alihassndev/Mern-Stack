import mongoose from "mongoose";

const foodDonationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: false },
    description: { type: String },
    quantity: { type: Number, required: true, min: 1 },
    category: {
      type: String,
      enum: ["fruits", "vegetables", "bakery", "meals", "dairy", "other"],
      default: "meals",
      required: false,
    },
    expiryDate: { type: Date, required: true },
    images: [{ type: String }], // Cloudinary URLs
    location: {
      address: { type: String, required: false },
      coordinates: { type: [Number], required: false }, // [longitude, latitude]
    },
    status: {
      type: String,
      enum: ["available", "reserved", "collected", "expired","delivered"],
      default: "available",
    },
    pickupWindow: {
      start: { type: Date, required: false },
      end: { type: Date, required: false },
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
