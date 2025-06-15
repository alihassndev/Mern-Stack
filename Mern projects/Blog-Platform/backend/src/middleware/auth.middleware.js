import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(404)
      .json({ success: false, message: "Token not found ..." });
  }

  let decode;

  try {
    decode = await jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findOne({ _id: decode.id });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found ..." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
  }
});

export { verifyJWT };
