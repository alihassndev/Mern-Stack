import { Router } from "express";
import {
  changePassword,
  forgetPassword,
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/change-password").post(changePassword);
router.route("/forget-password").post(forgetPassword);

export default router;
