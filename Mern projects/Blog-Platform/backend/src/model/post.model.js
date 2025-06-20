import mongoose from "mongoose";
import { Comment } from "./comment.model";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

postSchema.pre("remove", async function (next) {
  // Delete all comments where post = this._id
  await Comment.deleteMany({ post: this._id });
  next();
});

export const Post = mongoose.model("Post", postSchema);
