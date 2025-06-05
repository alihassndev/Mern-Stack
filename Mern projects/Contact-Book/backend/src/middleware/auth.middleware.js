import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Token not found ..." });
  }

  let decode;

  try {
    decode = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid token ..." });
  }

  const user = await User.findOne({ username: decode.username });

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "User not found for this token ..." });
  }

  req.user = user;

  next();
});

export { verifyJWT };
