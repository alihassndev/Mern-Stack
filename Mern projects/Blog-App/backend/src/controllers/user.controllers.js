import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ([password, username, email].some((field) => field?.trim() === "")) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const userExist = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!userExist) {
    return res
      .status(400)
      .json({ success: false, message: "User Already Exists" });
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    return res
      .status(400)
      .json({ success: false, message: "Avatar file is required" });
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    console.error("❌ Avatar upload failed for path:", avatarLocalPath);
    return res
      .status(400)
      .json({ success: false, message: "Avatar file is required" });
  }

  const createdUser = await User.create({
    username,
    email,
    password,
    image: avatar,
  });

  const user = await User.findById({ _id: createdUser._id }).select(
    "-password"
  );

  return res.status(201).json(201, user, "User created Successfully");
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res
      .status(400)
      .json({ success: false, message: "All fields required" });
  }

  const existingUser = await User.findOne(email);

  if (!existingUser) {
    return res
      .status(404)
      .json({ success: false, message: "User not found. Invalid Credentials" });
  }

  const token = await existingUser.generateToken();

  const options = {
    httpOnly: true,
    secure: true,
  };
  res.cookies("token", token, options);

  return res.status(200).json({ success: true, message: "Login Successfully" });
});

const logoutUser = asyncHandler(async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(400).json({ success: false, message: "Token not found" });
  }

  const isTokenValid = await jwt.verify(token, process.env.TOKEN_SECRET);

  if (!isTokenValid) {
    return res.status(400).json({ success: false, message: "Invalid Token" });
  }

  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .clearCookie("token", options)
    .json({ success: true, message: "logout successfully" });
});

export { registerUser, loginUser, logoutUser };
