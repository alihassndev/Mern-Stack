import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, role, DOB } = req.body;

  if ([username, email, password, role].some((field) => field?.trim() === "")) {
    console.log("all fields required");
    res.redirect("/login");
    return;
  }

  const userExist = User.findOne({
    $or: [{ username }, { email }],
  });

  if (!userExist) {
    console.log("User already exists try again ... ");
  }

  const user = await User.create({
    username,
    email,
    password,
    role,
    DOB,
  });

  const createdUser = await User.findById(user._id).select("-password");
});

export { registerUser };
