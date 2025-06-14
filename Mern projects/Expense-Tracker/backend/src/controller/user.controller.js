import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../model/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ([username, email, password].some((field) => field === "")) {
    return res
      .status(400)
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
      .status(400)
      .json({ success: false, message: "All fields are required ..." });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "unauthorized access. User not found with these credentials ...",
    });
  }

  const token = await user.generateToken();

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Error in creating token ..." });
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  res.cookie("token", token, options);
  return res
    .status(200)
    .json({ success: true, message: "user login successfully ..." });
});

const logoutUser = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid access user not found ..." });
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  res.clearCookie("token", options);
  return res
    .status(200)
    .json({ success: true, message: "Logout successfully ..." });
});

export { registerUser, loginUser, logoutUser };
