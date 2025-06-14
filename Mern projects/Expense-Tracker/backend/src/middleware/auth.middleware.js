import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token; // ✅ FIXED here

  if (!token) {
    return res.status(401).json({ success: false, message: "Token not found" });
  }

  try {
    const decode = jwt.verify(token, process.env.TOKEN_SECRET); // ✅ Verifies the token

    const user = await User.findById(decode.id); // ✅ Better to use findById

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found, invalid token" });
    }

    req.user = user;
    next(); // ✅ Proceed to next middleware/route
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
});
