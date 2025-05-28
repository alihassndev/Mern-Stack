import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ([passwod, email, username].some((field) => field.trim() === "")) {
    return res.status(401).json({ success: false, message: "Missing details" });
  }

  const user = await User.create({ username, email, password });
  res.status(201).json({ success: true, data: user, message: "user created" });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExist = await User.findOne(email);

  if (!userExist) {
    res.status(404).json({ success: false, message: "user not found" });
  }

  await userExist.isPasswordCorrect(password);
  await userExist.generateToken();

  const user = userExist.select("-password");

  res.status(200).json({ success: true, user, message: "login successfully" });
});

export { registerUser, loginUser };
