import mongoose from "mongoose";

const subTodoSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

export const SubTodo = mongoose.model("subTodo", subTodoSchema);
