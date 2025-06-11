import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../model/user.model.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "unauthorized access ..." });
  }

  const decode = jwt.verify(token, process.env.TOKEN_SECRET);

  const user = await User.findById({ _id: decode?.id }).select("-password");

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "user not found ..." });
  }

  req.user = user;

  next();
});

export { verifyJWT };
