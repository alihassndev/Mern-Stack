import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sendId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    recieverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
