import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/authorizeRole.js";
import {
  getAllUsers,
  getUserById,
  deleteUser,
  getAllPosts,
  deletePostByAdmin,
  getAllComments,
  deleteCommentByAdmin,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.use(protect, authorizeRoles("admin"));

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.delete("/users/:id", deleteUser);

router.get("/posts", getAllPosts);
router.delete("/posts/:id", deletePostByAdmin);

router.get("/comments", getAllComments);
router.delete("/comments/:id", deleteCommentByAdmin);

export default router;
