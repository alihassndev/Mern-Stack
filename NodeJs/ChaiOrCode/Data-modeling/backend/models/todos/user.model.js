import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/Todo");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("user", userSchema);
