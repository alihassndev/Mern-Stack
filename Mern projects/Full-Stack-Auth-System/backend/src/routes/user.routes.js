import { Router } from "express";
import {
  changePassword,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/verifyJwt.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/change-password").post(verifyJWT, changePassword);

export default router;
