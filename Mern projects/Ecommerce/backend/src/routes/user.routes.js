import { Router } from "express";
import {
  changePassword,
  forgetPassword,
  login,
  logout,
  register,
} from "../controller/auth.controller.js";
import {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUserRole,
} from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

// Public routes
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forget-password").patch(forgetPassword);

// Protected routes
router.route("/logout").post(verifyJWT, logout);
router.route("/change-password").patch(verifyJWT, changePassword);
router.route("/profile").get(verifyJWT, getUserProfile);
router.route("/profile").patch(verifyJWT, updateUserProfile);

// Admin routes
router.route("/admin/all").get(verifyJWT, authorizeRoles("admin"), getAllUsers);
router
  .route("/admin/:userId")
  .get(verifyJWT, authorizeRoles("admin"), getUserById);
router
  .route("/admin/:userId")
  .delete(verifyJWT, authorizeRoles("admin"), deleteUser);
router
  .route("/admin/:userId/role")
  .patch(verifyJWT, authorizeRoles("admin"), updateUserRole);

export default router;
