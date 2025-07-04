import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["donor", "ngo", "admin"],
      required: true,
      default: "donor",
    },
    location: {
      type: String,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = async function () {
  if (!process.env.TOKEN_SECRET) {
    throw new Error("JWT Secret is not defined!");
  }

  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      name: this.name, // Corrected here
      role: this.role,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};

export const User = mongoose.model("User", userSchema);
