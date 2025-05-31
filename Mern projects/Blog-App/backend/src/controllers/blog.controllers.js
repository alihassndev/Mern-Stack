import { asyncHandler } from "../utils/asyncHandler.js";
import { Blog } from "../models/blog.models.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createBlog = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const coverLocalPath = req.file?.path; // 👈  works because of upload.single("image")
  if (!coverLocalPath) {
    return res
      .status(400)
      .json({ success: false, message: "Avatar file is required" });
  }

  // 4) upload to Cloudinary
  const coverImage = await uploadOnCloudinary(coverLocalPath);
  if (!coverImage?.secure_url) {
    return res
      .status(500)
      .json({ success: false, message: "Avatar upload failed" });
  }

  const blog = await Blog.create({
    title,
    content,
    writer: req.user._id,
    category,
    coverImage: coverImage.secure_url,
    ispublished: true, // Optional
  });

  res.status(201).json({ success: true, data: blog });
});

// ➤ Get All Blogs
const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().populate("writer", "username email image");
  res.status(200).json({ success: true, data: blogs });
});

// ➤ Get Single Blog
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { $inc: { views: 1 } }, // 🔥 increment views by 1
    { new: true }
  ).populate("writer", "username image");

  if (!blog) {
    return res.status(404).json({ success: false, message: "Blog not found" });
  }

  res
    .status(200)
    .json({ success: true, data: blog, message: `${blog.title} is fetched` });
});

// ➤ Delete Blog
const deleteBlog = asyncHandler(async (req, res) => {
  const bloginfo = await Blog.findById(req.params.id);

  if (!bloginfo) {
    return res.status(404).json({ success: false, message: "Blog not found" });
  }

  if (req.user._id.equals(bloginfo.writer)) {
    await Blog.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } else {
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized access" });
  }
});

const getTopViewedBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.aggregate([
    { $sort: { views: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: "users",
        localField: "writer",
        foreignField: "_id",
        as: "writerInfo",
      },
    },
    { $unwind: "$writerInfo" },
    {
      $project: {
        title: 1,
        views: 1,
        "writerInfo.username": 1,
        "writerInfo.email": 1,
        "writerInfo.image": 1,
      },
    },
  ]);

  res.status(200).json({ success: true, data: blogs });
});

const getBlogsCountByCategory = asyncHandler(async (req, res) => {
  const stats = await Blog.aggregate([
    {
      $group: {
        _id: "$category",
        totalBlogs: { $sum: 1 },
      },
    },
    { $sort: { totalBlogs: -1 } },
  ]);

  res.status(200).json({ success: true, data: stats });
});

const getMostLikedBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.aggregate([
    { $sort: { likes: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: "users",
        localField: "writer",
        foreignField: "_id",
        as: "writerInfo",
      },
    },
    { $unwind: "$writerInfo" },
    {
      $project: {
        title: 1,
        likes: 1,
        "writerInfo.username": 1,
      },
    },
  ]);

  res.status(200).json({ success: true, data: blogs });
});

const getBlogsCountByUser = asyncHandler(async (req, res) => {
  const stats = await Blog.aggregate([
    {
      $group: {
        _id: "$writer", // group by writer ObjectId
        totalBlogs: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "users", // MongoDB collection name for users (check yours)
        localField: "_id", // writer _id from grouping
        foreignField: "_id", // _id in users collection
        as: "writerInfo",
      },
    },
    { $unwind: "$writerInfo" }, // flatten the array
    {
      $project: {
        totalBlogs: 1,
        "writerInfo.username": 1,
        "writerInfo._id": 1,
      },
    },
  ]);

  res.status(200).json({ success: true, data: stats });
});

const likeBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({ success: false, message: "Blog not found" });
  }

  blog.likes += 1; // increment like count

  // Save with validation enforced explicitly (default is true)
  await blog.save({ validateBeforeSave: false });

  res.status(200).json({ success: true, message: "Blog liked", data: blog });
});

export {
  createBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
  getTopViewedBlogs,
  getBlogsCountByCategory,
  getMostLikedBlogs,
  getBlogsCountByUser,
  likeBlog,
};
