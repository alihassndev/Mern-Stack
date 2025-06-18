import { Comment } from "../model/comment.model.js";
import { Post } from "../model/post.model.js";
import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const allUsers = asyncHandler(async (req, res) => {
  const user = req.user;

  if (user.role !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "unauthorized access ..." });
  }

  const users = await User.find().select("-password");

  return res
    .status(200)
    .json({ success: true, message: `${users.length} users found`, users });
});

const singleUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id).select("-password");

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "User not found ..." });
  }

  return res
    .status(200)
    .json({ success: true, message: "User found ...", user });
});

const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    return res
      .status(404)
      .json({ success: false, message: "User not found ..." });
  }

  return res
    .status(200)
    .json({ success: true, message: "User deleted successfully ..." });
});

const allPosts = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user.role === "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Uauthorized access ..." });
  }

  const posts = await Post.find();

  return res
    .status(200)
    .json({ success: true, message: `${posts.length} posts found ...` });
});

const deletePost = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const deletedPost = await Post.findByIdAndDelete(id);

  if (!deletePost) {
    return res
      .status(404)
      .json({ success: false, message: "Post not found ..." });
  }

  return res
    .status(200)
    .json({ success: true, message: "Post deleted successfully ..." });
});

const allComments = asyncHandler(async (req, res) => {
  const id = req.params.id; // this is post id

  const comments = await Comment.findOne({ post: id });

  if (!comments) {
    return res
      .status(404)
      .json({ success: false, message: "comments not found ..." });
  }

  return res
    .status(200)
    .json({ success: true, message: `${comments.length} comments found ...` });
});

const deleteComment = asyncHandler(async (req, res) => {
  const id = req.params.id; // comment id

  const deletedComment = await Comment.findByIdAndDelete(id);

  if (!deleteComment) {
    return res
      .status(404)
      .json({ success: false, message: "Comment not found ..." });
  }

  return res
    .status(200)
    .json({ success: true, message: "Comment deleted successfully ..." });
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
