import Router from "express";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "../controller/comment.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/:postId").post(verifyJWT, createComment);
router.route("/:postId").get(verifyJWT, getComments);
router.route("/update/:commentId").put(verifyJWT, updateComment);
router.route("/delete/:commentId").delete(verifyJWT, deleteComment);

export default router;
