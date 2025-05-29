// middleware/verifyJWT.js
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const verifyJWT = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ success: false, message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not in req" });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
