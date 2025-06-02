import { Router } from "express";
import {
  changeUserPassword,
  forgetUserPassword,
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forget-password").post(verifyJWT, forgetUserPassword);
router.route("/change-password").post(verifyJWT, changeUserPassword);
router.route("/logout").post(verifyJWT, logoutUser);

export { router };
