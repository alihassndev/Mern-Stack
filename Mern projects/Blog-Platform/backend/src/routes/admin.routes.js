import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
  getAllUsers,
  getUserById,
  deleteUser,
  getAllPosts,
  deletePostByAdmin,
  getAllComments,
  deleteCommentByAdmin,
} from "../controller/admin.controller.js";

const router = express.Router();

router.use(verifyJWT, authorizeRoles("admin"));

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.delete("/users/:id", deleteUser);

router.get("/posts", getAllPosts);
router.delete("/posts/:id", deletePostByAdmin);

router.get("/comments", getAllComments);
router.delete("/comments/:id", deleteCommentByAdmin);

export default router;
