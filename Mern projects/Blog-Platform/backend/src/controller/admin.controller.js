import { Comment } from "../model/comment.model.js";
import { Post } from "../model/post.model.js";
import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const allUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json({ success: true, users });
});

const singleUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.status(200).json({ success: true, user });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.status(200).json({ success: true, message: "User deleted successfully" });
});

const allPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate("author", "name email");
  res.status(200).json({ success: true, posts });
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ success: false, message: "Post not found" });
  }

  // Trigger cascade delete
  await post.remove();

  res.status(200).json({ success: true, message: "Post deleted by admin" });
});

const allComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find()
    .populate("author", "name email")
    .populate("post", "title");
  res.status(200).json({ success: true, comments });
});

const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findByIdAndDelete(req.params.id);

  if (!comment) {
    return res
      .status(404)
      .json({ success: false, message: "Comment not found" });
  }

  res.status(200).json({ success: true, message: "Comment deleted by admin" });
});

export {
  allUsers,
  singleUser,
  deleteUser,
  allPosts,
  deletePost,
  allComments,
  deleteComment,
};
