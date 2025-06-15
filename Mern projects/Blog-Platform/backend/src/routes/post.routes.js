import Router from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  getSinglePost,
  updatePost,
} from "../controller/post.controller.js";

const router = Router();

router.route("/create").post(verifyJWT, createPost);
router.route("/").get(verifyJWT, getAllPosts);
router.route("/:id").get(verifyJWT, getSinglePost);
router.route("/update/:id").put(verifyJWT, updatePost);
router.route("/delete/:id").delete(verifyJWT, deletePost);

export default router;
