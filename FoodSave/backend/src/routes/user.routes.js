import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updatePassword
} from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/me").get(verifyJWT, getCurrentUser);
router.route("/").get(getAllUsers);
router
  .route("/:id")
  .get(verifyJWT, getUserById)
  .put(verifyJWT, updateUser)
  .delete(verifyJWT, deleteUser);

router.route("/:id/password").put(verifyJWT, updatePassword);

export default router;
