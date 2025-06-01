import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "complete"],
      default: "pending",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
