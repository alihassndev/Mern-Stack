import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const register = asyncHandler(async (req, res) => {
  const { name, email, password, role, location } = req.body;

  if (
    [name, email, password, role, location].some(
      (field) => field === "" || field === undefined
    )
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  const existingUser = await User.findOne(email);

  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "User already exits with this email" });
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    location,
  });

  if (!user) {
    return res
      .status(500)
      .json({ success: false, message: "Server error while registering user" });
  }

  return res
    .status(200)
    .json({ success: true, message: "User registered successfully" });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne(email);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const isPasswordValid = user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Password" });
  }

  const token = await user.generateToken();

  if (!token) {
    return res
      .status(500)
      .json({ success: false, message: "Error in creating token" });
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  res.cookie("token", token, options);
  return res
    .status(200)
    .json({ success: true, message: "User logged in successfully" });
});

const logout = asyncHandler(async (req, res) => {
  const user = req.user;

  const token = req.cookies.token;

  if (!user || !token) {
    return res.status(401).json({ success: false, message: "Invalid access" });
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  res.clearCookie("token", options);
  return res
    .status(200)
    .json({ success: true, message: "User logout successfully" });
});

export { register, login, logout };
