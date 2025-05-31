import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // 1) basic validation
  if ([username, email, password].some((f) => !f?.trim())) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  // 2) uniqueness check
  const userExist = await User.findOne({ $or: [{ email }, { username }] });
  if (userExist) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }

  // 3) file check
  const avatarLocalPath = req.file?.path; // 👈  works because of upload.single("image")
  if (!avatarLocalPath) {
    return res
      .status(400)
      .json({ success: false, message: "Avatar file is required" });
  }

  // 4) upload to Cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar?.secure_url) {
    return res
      .status(500)
      .json({ success: false, message: "Avatar upload failed" });
  }

  // 5) create user (password already hashed in pre("save") hook)
  const createdUser = await User.create({
    username,
    email,
    password,
    image: avatar.secure_url, // store the CDN URL, not the whole response object
  });

  // 6) return user without password
  const user = await User.findById(createdUser._id).select("-password");

  return res
    .status(201)
    .json({ success: true, data: user, message: "User created successfully" });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res
      .status(400)
      .json({ success: false, message: "All fields required" });
  }

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res
      .status(404)
      .json({ success: false, message: "User not found. Invalid Credentials" });
  }

  const isPasswordValid = await existingUser.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Password" });
  }

  const token = await existingUser.generateToken();

  const options = {
    httpOnly: true,
    secure: true,
  };

  res.cookie("token", token, options);

  return res.status(200).json({ success: true, message: "Login Successfully" });
});

const logoutUser = asyncHandler(async (req, res) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(400).json({ success: false, message: "Token not found" });
  }

  try {
    jwt.verify(token, process.env.TOKEN_SECRET); // just to ensure it's valid
  } catch (err) {
    return res.status(400).json({ success: false, message: "Invalid Token" });
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .clearCookie("token", options)
    .status(200)
    .json({ success: true, message: "Logout successfully" });
});

export { registerUser, loginUser, logoutUser };
