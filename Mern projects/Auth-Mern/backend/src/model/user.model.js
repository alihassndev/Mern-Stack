import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    DOB: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["student", "professional"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await brcrypt.hash(this.password, 10);
  next();
});

export const User = mongoose.model("User", userSchema);
