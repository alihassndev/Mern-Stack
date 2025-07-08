import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    totalDonations: {
      type: Number,
      default: 0,
    },
    successfulPickups: {
      type: Number,
      default: 0,
    },
    expiredDonations: {
      type: Number,
      default: 0,
    },
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }, // Admin who generated
  },
  {
    timestamps: true,
  }
);

export const Report = mongoose.model("Report", ReportSchema);
