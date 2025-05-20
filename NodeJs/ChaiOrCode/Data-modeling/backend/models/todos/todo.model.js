import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    complete: {
      type: Boolean,
      default: false,
    },
    createdby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    subTodos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subTodo",
      },
    ],
  },
  { timestamps: true }
);

export const Todo = mongoose.model("todo", todoSchema);
