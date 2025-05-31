import { User } from "../models/user.models.js";
import "dotenv/config";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  // _ --> res
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized request" });
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findById(decodedToken?.id).select("-password");

    if (!user) {
      // todo in frontend
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized request" });
  }
});
