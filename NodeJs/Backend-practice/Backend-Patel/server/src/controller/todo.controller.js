import { Todo } from "../model/todo.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTodo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required ..." });
  }

  const existingTodo = await Todo.findOne({ title });

  if (existingTodo) {
    return res
      .status(401)
      .json({ success: false, message: "Todo already exists ..." });
  }

  const todo = await Todo.create({
    title,
    description,
    user: req.user._id,
  });

  if (!todo) {
    return res
      .status(401)
      .json({ success: false, message: "Error in creating a todo ..." });
  }

  return res
    .status(200)
    .json({ success: true, message: "Todo is created ..." });
});

const updateTodo = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  // Check if at least one field is provided
  if (!title && !description) {
    return res.status(400).json({
      success: false,
      message:
        "At least one field (title or description) is required to update.",
    });
  }

  // Create an update object with only the fields that are provided
  const updateData = {};
  if (title) updateData.title = title;
  if (description) updateData.description = description;

  const todo = await Todo.findByIdAndUpdate(id, updateData, { new: true });

  if (!todo) {
    return res.status(404).json({ success: false, message: "Todo not found." });
  }

  return res
    .status(200)
    .json({ success: true, message: "Todo updated successfully.", data: todo });
});

const deleteTodo = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(404).json({ success: false, message: "ID not found." });
  }

  const deletedTodo = await Todo.findByIdAndDelete(id);

  if (!deletedTodo) {
    return res.status(404).json({ success: false, message: "Todo not found." });
  }

  return res
    .status(200)
    .json({ success: true, message: "Todo deleted successfully." });
});

const getTodo = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(404).json({ success: false, message: "ID not found." });
  }

  const todo = await Todo.findById({ _id: id });

  if (!todo) {
    return res.status(404).json({ success: false, message: "Todo not found." });
  }

  return res
    .status(200)
    .json({ success: true, message: "Todo fetched successfully.", todo });
});

const getAllTodos = asyncHandler(async (req, res) => {
  const user = req.user;

  const todos = await Todo.find({ user: user._id });

  if (!todos) {
    return res
      .status(404)
      .json({ success: false, message: "Todos not found." });
  }

  return res
    .status(200)
    .json({ success: true, message: "All todos fetched successfully.", todos });
});

export { createTodo, updateTodo, deleteTodo, getTodo, getAllTodos };
