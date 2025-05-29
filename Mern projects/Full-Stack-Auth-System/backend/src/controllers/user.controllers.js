import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import bcrypt from "bcrypt";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ([password, email, username].some((field) => field?.trim() === "")) {
    return res.status(401).json({ success: false, message: "Missing details" });
  }

  const user = await User.create({ username, email, password });
  res.status(201).json({ success: true, data: user, message: "user created" });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (!userExist) {
    res.status(404).json({ success: false, message: "user not found" });
  }
  // console.log(userExist);

  const isPasswordValid = await userExist.isPasswordCorrect(password);
  // console.log(isPasswordValid);

  if (!isPasswordValid) {
    return res
      .status(401)
      .json({ success: false, message: "Password is incorrect" });
  }

  const token = await userExist.generateToken();

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Token generation error" });
  }

  const user = await User.findById(userExist._id).select("-password");

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "User object fetching error" });
  }

  const option = {
    httpOnly: true,
    secure: true,
  };

  req.user = user;

  res.cookie("token", token, option);
  return res
    .status(200)
    .json({ success: true, user, message: "login successfully" });
});

const logoutUser = asyncHandler(async (req, res) => {
  const user = req.user;
  // console.log(user);

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "User object fetching error 101" });
  }

  res.cookie.token = "";

  return res
    .status(200)
    .json({ success: true, user, message: "logout successfully" });
});

const changePassword = asyncHandler(async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json(new ApiError(400, "Password field is must"));
  }

  const user = User.findById(req.user._id);

  user.password = bcrypt.hash(password, 10);

  await user.save({ validateBeforeSave: false });

  const updatedUser = await User.findById(user._id).select("-password");
  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Password changed successfully"));
});

export { registerUser, loginUser, logoutUser, changePassword };
