import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"; // Add this missing import

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, role, DOB } = req.body;

  // Validation
  if (
    [username, email, password, role, DOB].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user exists
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // Create user
  const user = await User.create({
    username,
    email,
    password,
    role,
    DOB,
  });

  // Get created user without password
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!(username || email)) {
    throw new ApiError(400, "Username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateTokens(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: { refreshToken: 1 },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

// Get current user profile - THIS IS THE MISSING ENDPOINT
const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(200, req.user, "Current user fetched successfully")
  );
});

// Helper function
const generateTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

// Admin: Get all users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password -refreshToken");
  return res.status(200).json(new ApiResponse(200, users, "All users fetched"));
});

// Admin: Get user by ID
const getUserById = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") throw new ApiError(403, "Admin only");
  const user = await User.findById(req.params.id).select(
    "-password -refreshToken"
  );
  if (!user) throw new ApiError(404, "User not found");
  return res.status(200).json(new ApiResponse(200, user, "User fetched"));
});

// Update user (allow users to update their own profile)
const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  
  // Check if user is authorized (admin or the user themselves)
  if (req.user.role !== "admin" && req.user._id.toString() !== userId) {
    throw new ApiError(403, "You are not authorized to update this user");
  }
  
  const user = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  }).select("-password -refreshToken");
  
  if (!user) throw new ApiError(404, "User not found");
  return res.status(200).json(new ApiResponse(200, user, "User updated"));
});

// Admin: Delete user
const deleteUser = asyncHandler(async (req, res) => {
  console.log('Delete user request:', {
    userId: req.params.id,
    requestingUser: req.user._id,
    requestingUserRole: req.user.role
  });
  
  if (req.user.role !== "admin") {
    console.log('Access denied: User is not admin');
    throw new ApiError(403, "Admin only");
  }
  
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    console.log('User not found:', req.params.id);
    throw new ApiError(404, "User not found");
  }
  
  console.log('User deleted successfully:', req.params.id);
  return res.status(200).json(new ApiResponse(200, null, "User deleted"));
});

// Update user password
const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.params.id;
  
  // Check if user is authorized (admin or the user themselves)
  if (req.user.role !== "admin" && req.user._id.toString() !== userId) {
    throw new ApiError(403, "You are not authorized to update this user's password");
  }
  
  // Find user
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");
  
  // Verify current password
  const isPasswordValid = await user.isPasswordCorrect(currentPassword);
  if (!isPasswordValid) {
    throw new ApiError(401, "Current password is incorrect");
  }
  
  // Update password
  user.password = newPassword;
  await user.save();
  
  return res.status(200).json(
    new ApiResponse(200, {}, "Password updated successfully")
  );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const { accessToken, refreshToken: newRefreshToken } = await generateTokens(user._id);

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updatePassword,
  refreshAccessToken // Add this
};
