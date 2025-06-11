import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(401)
      .json({ success: false, message: "All fields are required ..." });
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists ..." });
  }

  const user = await User.create({ username, email, password });

  if (!user) {
    return res
      .status(500)
      .json({ success: false, message: "Error in registering a user ..." });
  }

  return res
    .status(201)
    .json({ success: true, message: "User created successfully ..." });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(401)
      .json({ success: false, message: "All fields are required ..." });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "user not found ..." });
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ success: false, message: "Password in incorrect ..." });
  }

  const token = await user.generateToken();

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "error in creating a token ..." });
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  res.cookie("token", token, options);

  return res
    .status(200)
    .json({ success: true, message: "User login successfully ..." });
});

const logoutUser = asyncHandler(async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(404)
      .json({ success: false, message: "Token not found ..." });
  }

  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    path: "/",
  });

  return res
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById({ _id: req.user._id });

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "unauthorized access ..." });
  }

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    return res
      .status(401)
      .json({ success: false, message: "Old password is incorrect ..." });
  }

  user.password = newPassword;

  user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json({ success: true, message: "Password changed successfully ..." });
});

const forgetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const user = req.user;

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "unauthorized access ..." });
  }

  const foundUser = await User.findById({ _id: user._id });

  if (!foundUser) {
    return res
      .status(401)
      .json({ success: false, message: "User not found ..." });
  }

  if (!password) {
    return res
      .status(401)
      .json({ success: false, message: "Password field is required ..." });
  }

  foundUser.password = password;

  foundUser.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json({ success: true, message: "Password updated successfully ..." });
});

export { registerUser, loginUser, logoutUser, changePassword, forgetPassword };
