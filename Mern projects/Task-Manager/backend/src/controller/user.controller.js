import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required ..." });
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    return res
      .status(401)
      .json({ success: false, message: "User already Exists ..." });
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (!user) {
    return res
      .status(500)
      .json({ success: false, message: "Error in creating new user" });
  }

  return res
    .status(201)
    .json({ success: true, message: "user created successfully ..." });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required ..." });
  }

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required ..." });
  }

  if (!password) {
    return res
      .status(400)
      .json({ success: false, message: "Password is required ..." });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Credentials" });
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ success: false, message: "Password is incorrect ..." });
  }

  const token = await user.generateToken();

  if (!token) {
    return res
      .status(500)
      .json({ success: false, message: "Error in generating token ..." });
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  res.cookies("token", token, options);

  return res
    .status(200)
    .json({ success: true, message: "Login successfully ..." });
});

const logoutUser = asyncHandler(async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(500)
      .json({ success: false, message: "Unauthorized Access ..." });
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("token", options)
    .json({ success: true, message: "logout successful ..." });
});

const forgetUserPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required ..." });
  }

  const user = User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: `no user found for this email: ${email}`,
    });
  }

  user.password = password;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json({ success: true, message: "Password changed successfully ..." });
});

const changeUserPassword = asyncHandler(async (req, res) => {
  const user = req.user;
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required ..." });
  }

  if (email !== user.email) {
    return res.status(400).json({ success: false, message: "wrong email ..." });
  }

  user.password = password;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json({ success: true, message: "Password changed successfully ..." });
});

export {
  registerUser,
  loginUser,
  logoutUser,
  changeUserPassword,
  forgetUserPassword,
};
