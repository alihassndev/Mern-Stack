import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  return res.status(200).json({
    success: true,
    user: {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    },
  });
});

// Update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const { fullname, email } = req.body;
  const userId = req.user._id;

  if (!fullname || !email) {
    return res
      .status(400)
      .json({ success: false, message: "Fullname and email are required." });
  }

  // Check if email is already taken by another user
  const existingUser = await User.findOne({ email, _id: { $ne: userId } });
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "Email is already taken." });
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      fullname,
      email,
    },
    { new: true }
  );

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully.",
    user: {
      _id: updatedUser._id,
      fullname: updatedUser.fullname,
      email: updatedUser.email,
      role: updatedUser.role,
      createdAt: updatedUser.createdAt,
    },
  });
});

// Get all users (admin only)
const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;

  const query = {};

  // Search by name or email
  if (search) {
    query.$or = [
      { fullname: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (page - 1) * limit;

  const users = await User.find(query)
    .select("-password")
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

  const total = await User.countDocuments(query);

  return res.status(200).json({
    success: true,
    users,
    totalPages: Math.ceil(total / limit),
    currentPage: parseInt(page),
    total,
  });
});

// Get user by ID (admin only)
const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId).select("-password");

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found." });
  }

  return res.status(200).json({
    success: true,
    user,
  });
});

// Delete user (admin only)
const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found." });
  }

  // Prevent admin from deleting themselves
  if (user.role === "admin") {
    return res
      .status(400)
      .json({ success: false, message: "Cannot delete admin user." });
  }

  await User.findByIdAndDelete(userId);

  return res.status(200).json({
    success: true,
    message: "User deleted successfully.",
  });
});

// Update user role (admin only)
const updateUserRole = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  if (!role || !["user", "admin"].includes(role)) {
    return res
      .status(400)
      .json({ success: false, message: "Valid role is required." });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found." });
  }

  // Check if there's already an admin and trying to create another
  if (role === "admin") {
    const existingAdmin = await User.findOne({
      role: "admin",
      _id: { $ne: userId },
    });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ success: false, message: "There can only be one admin." });
    }
  }

  user.role = role;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "User role updated successfully.",
    user: {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
    },
  });
});

export {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUserRole,
};
