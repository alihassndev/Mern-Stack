import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required ..."],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.methods.generateToken = async function () {
  return await jwt.sign(
    {
      id: this.id,
      email: this.email,
    },
    process.env.TOKEN_SECRET
  );
};

export const User = mongoose.model("User", userSchema);
