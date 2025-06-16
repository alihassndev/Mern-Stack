import { Comment } from "../model/comment.model.js";
import { Post } from "../model/post.model.js";
import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createComment = asyncHandler(async (req, res) => {
  const postId = req.params.postId;
  const { content } = req.body;
  const userId = req.user._id;

  if (!content) {
    return res
      .status(400)
      .json({ success: false, message: "All fields required ..." });
  }

  const post = await Post.findById(postId);

  if (!post) {
    return res
      .status(404)
      .json({ success: false, message: "post not found ..." });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res
      .status(403)
      .json({ success: false, message: "unauthorized access ..." });
  }

  const comment = await Comment.create({
    content,
    author: userId,
    post: postId,
  });

  if (!comment) {
    return res.status(500).json({
      success: false,
      message: "Server Error in uploading comment ...",
    });
  }

  return res
    .status(200)
    .json({ success: true, message: "Comment created ..." });
});

const getComments = asyncHandler(async (req, res) => {
  const postId = req.params.postId;

  const comments = await Comment.find({ post: postId });

  return res.status(200).json({
    success: true,
    message: `${comments.length} comments found ...`,
  });
});

const updateComment = asyncHandler(async (req, res) => {
  const commentId = req.params.commentId;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({
      success: false,
      message: "All fields required ...",
    });
  }

  const comment = await Comment.findByIdAndUpdate(
    commentId,
    { content },
    { new: true }
  );

  if (!comment) {
    return res.status(404).json({
      success: false,
      message: "Comment not found ...",
    });
  }

  return res
    .status(200)
    .json({ success: true, message: "Comment updated successfully ..." });
});

const deleteComment = asyncHandler(async (req, res) => {
  const commentId = req.params.commentId;

  const deletedComment = await Comment.findByIdAndDelete(commentId);

  if (!deletedComment) {
    return res
      .status(404)
      .json({ success: false, message: "Comment not found ..." });
  }

  return res
    .status(200)
    .json({ success: true, message: "Comment deleted successfully ..." });
});

export { createComment, getComments, updateComment, deleteComment };
