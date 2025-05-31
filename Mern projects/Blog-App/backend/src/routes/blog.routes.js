import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
  getTopViewedBlogs,
  getBlogsCountByCategory,
  getMostLikedBlogs,
  getBlogsCountByUser,
  likeBlog,
} from "../controllers/blog.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router.post("/", verifyJWT, upload.single("coverImage"), createBlog);
router.get("/", verifyJWT, getAllBlogs);
router.put("/blogs/:id/like", verifyJWT, likeBlog);
router.get("/top-viewed", verifyJWT, getTopViewedBlogs);
router.get("/most-liked", verifyJWT, getMostLikedBlogs);
router.get("/category-stats", verifyJWT, getBlogsCountByCategory);
router.get("/user-stats", verifyJWT, getBlogsCountByUser);
router.get("/:id", verifyJWT, getBlogById);
router.delete("/:id", verifyJWT, deleteBlog);

export { router };
