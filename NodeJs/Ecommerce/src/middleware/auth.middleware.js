import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;

  let decode;
  try {
    decode = await jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findOne({ email: decode.email });

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Token not found." });
  }
});

export { verifyJWT };
