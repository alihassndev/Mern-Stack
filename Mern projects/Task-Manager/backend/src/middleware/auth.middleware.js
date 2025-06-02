import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../model/user.model.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Token not found ..." });
  }

  // ✅ Decode token to get the payload (like id, email)
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }

  // ✅ Use decoded.id to find the user
  const user = await User.findById(decoded.id);
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "User not found ..." });
  }

  req.user = user;
  next();
});

export { verifyJWT };
