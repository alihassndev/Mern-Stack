import { Comment } from "../model/comment.model.js";
import { Post } from "../model/post.model.js";
import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json({ success: true, users, message: "All users fetched" });
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.status(200).json({ success: true, user, message: "User found" });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.status(200).json({ success: true, message: "User deleted successfully" });
});

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate("author", "name email");
  res.status(200).json({ success: true, posts, message: "All posts fetched" });
});

const deletePostByAdmin = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ success: false, message: "Post not found" });
  }

  // Trigger cascade delete
  await post.remove();

  res.status(200).json({ success: true, message: "Post deleted by admin" });
});

const getAllComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find()
    .populate("author", "name email")
    .populate("post", "title");
  res.status(200).json({
    success: true,
    comments,
    message: "All comments fetched successfully",
  });
});

const deleteCommentByAdmin = asyncHandler(async (req, res) => {
  const comment = await Comment.findByIdAndDelete(req.params.id);

  if (!comment) {
    return res
      .status(404)
      .json({ success: false, message: "Comment not found" });
  }

  res.status(200).json({ success: true, message: "Comment deleted by admin" });
});

export {
  getAllUsers,
  getUserById,
  deleteUser,
  getAllPosts,
  deletePostByAdmin,
  getAllComments,
  deleteCommentByAdmin,
};
