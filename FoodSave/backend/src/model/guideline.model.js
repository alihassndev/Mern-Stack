import mongoose from "mongoose";

const guidelineSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Guideline = mongoose.model("Guideline", guidelineSchema);
