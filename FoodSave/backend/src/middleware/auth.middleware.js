import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import "dotenv/config.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // 1. Get token from cookies or Authorization header
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace(/^Bearer\s/, "");

    if (!token) {
      throw new ApiError(401, "Unauthorized: No token provided");
    }

    // 2. Verify token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decodedToken?._id) {
      throw new ApiError(401, "Invalid token: Malformed payload");
    }

    // 3. Find user and check if they exist
    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid token: User not found");
    }

    // 4. Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    // Handle specific JWT errors
    if (error instanceof jwt.JsonWebTokenError) {
      throw new ApiError(401, "Invalid token: JWT error");
    }
    if (error instanceof jwt.TokenExpiredError) {
      throw new ApiError(401, "Token expired");
    }

    // Propagate other errors
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
