import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Token not found ..." });
  }

  const user = await User.findOne({ _id: token.id });

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "User not found ..." });
  }

  req.user = user;

  next();
});

export { verifyJWT };
