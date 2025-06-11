import { Router } from "express";
import {
  changePassword,
  forgetPassword,
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/change-password").post(verifyJWT, changePassword);
router.route("/forget-password").post(verifyJWT, forgetPassword);

export default router;
