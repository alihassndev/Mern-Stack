import { Post } from "../model/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const user = req.user;

  if (!title || !content) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required ..." });
  }

  const post = await Post.create({
    title,
    content,
    author: user._id,
  });

  if (!post) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong in creating a post ...",
    });
  }

  return res
    .status(201)
    .json({ success: true, message: "post created successfully ..." });
});

const getAllPosts = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "unautorized access ..." });
  }

  const posts = await Post.find({ author: user._id });

  if (!posts) {
    return res
      .status(404)
      .json({ success: false, message: "posts not found ..." });
  }

  return res.status(200).json({
    success: true,
    message: "All posts fetched successfully ...",
    posts,
  });
});

const getSinglePost = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const post = await Post.findOne(id);

  if (!post) {
    return res
      .status(404)
      .json({ success: false, message: "post not found ..." });
  }

  return res
    .status(200)
    .json({ success: true, message: "post fetched successfully ..." });
});

const updatePost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;

  const post = await Post.findOne(id);

  if (!post) {
    return res
      .status(404)
      .json({ success: false, message: "post not found ..." });
  }

  const updatedObject = {};
  if (title) updatedObject.title = title;
  if (content) updatedObject.content = content;

  const updatedPost = await Post.findByIdAndUpdate(
    { _id: id, author: post.author },
    updatedObject,
    { new: true }
  );

  if (!updatedPost) {
    return res
      .status(500)
      .json({ success: false, message: "Error in updating post ..." });
  }

  return res
    .status(200)
    .json({ success: true, message: "post updated successfully ..." });
});

const deletePost = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const deletedPost = await Post.findByIdAndDelete(id);

  if (!deletedPost) {
    return res
      .status(404)
      .json({ success: false, message: "Post not found ..." });
  }

  return res
    .status(200)
    .json({ success: true, message: "Post deleted successfully ..." });
});

export { createPost, getAllPosts, getSinglePost, updatePost, deletePost };
