import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  // _ --> res
  try {
    const token =
      req.cookies?.AccessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized request" });
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select("-paaword");

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
