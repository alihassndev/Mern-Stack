import Router from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  createPost,
  deletePost,
  dislikePost,
  getUserPosts,
  getSinglePost,
  likePost,
  updatePost,
  getAllPosts,
} from "../controller/post.controller.js";

const router = Router();

router.route("/create").post(verifyJWT, createPost);
router.route("/").get(verifyJWT, getAllPosts);
router.route("/user").get(verifyJWT, getUserPosts);
router.route("/user/:id").get(verifyJWT, getSinglePost);
router.route("/update/:id").put(verifyJWT, updatePost);
router.route("/delete/:id").delete(verifyJWT, deletePost);
router.route("/:id/like").patch(verifyJWT, likePost);
router.route("/:id/dislike").patch(verifyJWT, dislikePost);

export default router;
