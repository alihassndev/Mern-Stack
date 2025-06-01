import { Router } from "express";
import {
  forgetUserPassword,
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forget-password").post(forgetUserPassword);
router.route("/logout").post(logoutUser);

export { router };
