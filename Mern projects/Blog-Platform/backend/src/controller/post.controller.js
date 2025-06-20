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

const getUserPosts = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "unautorized access ..." });
  }

  const posts = await Post.find({ author: user._id });

  return res.status(200).json({
    success: true,
    message: `${posts.length} posts fetched successfully ...`,
    posts,
  });
});

const getAllPosts = asyncHandler(async (req, res) => {
  const allPosts = await Post.find();

  return res.status(200).json({
    success: true,
    message: `${allPosts.length} posts found ...`,
    allPosts,
  });
});

const getSinglePost = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const post = await Post.findById(id);

  if (!post) {
    return res
      .status(404)
      .json({ success: false, message: "post not found ..." });
  }

  return res
    .status(200)
    .json({ success: true, message: "post fetched successfully ...", post });
});

const updatePost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;

  const post = await Post.findById(id);

  if (!post) {
    return res
      .status(404)
      .json({ success: false, message: "post not found ..." });
  }

  const updatedObject = {};
  if (title) updatedObject.title = title;
  if (content) updatedObject.content = content;

  if (String(post.author) !== String(req.user._id)) {
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }

  const updatedPost = await Post.findByIdAndUpdate(id, updatedObject, {
    new: true,
  });

  if (!updatedPost) {
    return res
      .status(500)
      .json({ success: false, message: "Error in updating post ..." });
  }

  return res.status(200).json({
    success: true,
    message: "post updated successfully ...",
    updatedPost,
  });
});

const deletePost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ success: false, message: "Post not found" });
  }

  // Trigger cascade delete
  await post.remove();

  return res
    .status(200)
    .json({ success: true, message: "Post deleted successfully ..." });
});

const likePost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;

  const post = await Post.findOne({ _id: id }).populate("author", "name");

  if (!post) {
    return res
      .status(404)
      .json({ success: false, message: "Post not found ..." });
  }

  if (post.likes.includes(userId)) {
    post.likes.pull(userId);
  } else {
    post.likes.push(userId);
    post.dislikes.pull(userId);
  }

  await post.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json({ success: true, message: "Post liked/disliked ...", post });
});

const dislikePost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;

  const post = await Post.findOne({ _id: id }).populate("author", "name");

  if (!post) {
    return res
      .status(404)
      .json({ success: false, message: "Post not found ..." });
  }

  if (post.dislikes.includes(userId)) {
    post.dislikes.pull(userId);
  } else {
    post.dislikes.push(userId);
    post.likes.pull(userId);
  }

  await post.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json({ success: true, message: "Post disliked/liked ...", post });
});

export {
  createPost,
  getUserPosts,
  getSinglePost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  getAllPosts,
};
