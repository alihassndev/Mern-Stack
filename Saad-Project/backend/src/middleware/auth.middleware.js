import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.AccessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(404)
        .json({ success: false, message: "Token not found ..." });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token ..." });
    }

    req.user = user;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid token ..." });
  }
});
