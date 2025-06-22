import "dotenv/config";
import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
import { asyncHandler } from "../utils/asyncHandler.js";

const register = asyncHandler(async (req, res) => {
  const { fullname, email, password, role } = req.body;

  if (
    [fullname, email, password, role].some(
      (field) => field === "" || field === undefined
    )
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields required." });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists." });
  }

  const isAdmin = await User.findOne({ role: "admin" });

  if (isAdmin && role === "admin") {
    return res
      .status(400)
      .json({ success: false, message: "There is only one admin allowed." });
  }

  const user = await User.create({
    fullname,
    email,
    password,
    role,
  });

  return res
    .status(200)
    .json({ success: true, message: "User created successfully.", user });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "User not registered." });
  }

  // Validate password
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials." });
  }

  // Generate JWT token
  const token = await user.generateToken();

  // Set cookie options
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  };

  // Send token in cookie
  res.cookie("token", token, options);
  return res
    .status(200)
    .json({ success: true, message: "User logged in successfully." });
});

const logout = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found." });
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  res.clearCookie("token", options);

  return res
    .status(200)
    .json({ success: true, message: "User logout successfully." });
});

const forgetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required." });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found." });
  }

  user.password = newPassword;

  await user.save({
    validateBeforeSave: false,
  });

  return res
    .status(200)
    .json({ success: true, message: "Password updated successfully." });
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = req.user;

  if (!oldPassword || !newPassword) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access." });
  }

  const isPasswordValid = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter correct old password." });
  }

  user.password = newPassword;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json({ success: true, message: "Password changes successfully." });
});

export { register, login, logout, forgetPassword, changePassword };
