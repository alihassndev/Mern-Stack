import mongoose from "mongoose";

const pickupRequestSchema = new mongoose.Schema(
  {
    donation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodDonation",
      required: true,
    },
    ngo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed"],
      default: "pending",
    },
    proposedPickupTime: { type: Date, required: true },
    message: { type: String, maxlength: 500 },
    driver: {
      name: String,
      contact: String,
      vehicleDetails: String,
    },
    completionTime: Date,
  },
  { timestamps: true }
);

// Auto-update donation status when request is accepted
pickupRequestSchema.post("save", async function (doc) {
  if (doc.status === "accepted") {
    await mongoose
      .model("FoodDonation")
      .updateOne({ _id: doc.donation }, { $set: { status: "reserved" } });
  }
});

export const PickupRequest = mongoose.model(
  "PickupRequest",
  pickupRequestSchema
);
