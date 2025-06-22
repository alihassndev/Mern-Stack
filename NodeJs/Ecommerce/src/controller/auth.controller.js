import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const register = asyncHandler(async (req, res) => {
  const { fullname, email, password, role } = req.body;

  if (
    [fullname, email, password, role].some(
      (field) => field === "" || field === undefined
    )
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required ..." });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "user already exists ..." });
  }

  const user = await User.create({
    fullname,
    email,
    password,
    role,
  });

  if (!user) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong on server ..." });
  }

  return res
    .status(201)
    .json({ success: true, message: "user created successfully ..." });
});

const login = asyncHandler(async (req, res) => {
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
      message: "unauthorized access user not found ...",
    });
  }

  const ispasswordValid = await user.correctPassword(password);

  if (!ispasswordValid) {
    return res
      .status(400)
      .json({ success: false, message: "incorrect password ..." });
  }

  const token = await user.generateToken();

  if (!token) {
    return res
      .status(500)
      .json({ success: false, message: "Error in creating token ..." });
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  res.cookie("token", token, options);
  return res
    .status(200)
    .json({ success: true, message: "Login successfully ..." });
});

const logout = asyncHandler(async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(404)
      .json({ success: false, message: "token not found ..." });
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  res.clearCookie("token", options);

  return res
    .status(200)
    .json({ success: true, message: "logout successfully ..." });
});

export { register, login, logout };
