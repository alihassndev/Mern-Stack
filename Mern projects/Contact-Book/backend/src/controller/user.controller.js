import bcrypt from "bcrypt";
import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (!username || !password || !confirmPassword) {
    return res
      .status(401)
      .json({ success: false, message: "All fields are required ..." });
  }

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Password must be same ..." });
  }

  const existingUser = await User.findOne({ username: username });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exits. Please another username ...",
    });
  }

  const user = await User.create({
    username,
    password,
  });

  if (!user) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong in creating a user ...",
    });
  }

  return res
    .status(201)
    .json({ success: true, message: "User created successfully ..." });
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required ..." });
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found with these credentials ...",
    });
  }

  const isPasswordCorrect = bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res
      .status(400)
      .json({ success: false, message: "Password is in correct ..." });
  }

  const token = await user.generateToken();

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Token not found ..." });
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  res.cookie("token", token, options);
  return res
    .status(200)
    .json({ success: true, message: "login successfully ..." });
});

const logoutUser = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "User not found from token ..." });
  }

  const userExist = await User.findOne({ username: user.username });

  if (!userExist) {
    return res
      .status(404)
      .json({ success: false, message: "User not found ..." });
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("token", options)
    .json({ success: true, message: "Logout successfully ..." });
});

export { registerUser, loginUser, logoutUser };
