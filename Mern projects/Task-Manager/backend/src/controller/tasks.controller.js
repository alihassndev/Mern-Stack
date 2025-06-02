import { Task } from "../model/tasks.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { existingTaskCheck } from "../utils/taskCheck.js";

const createTask = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title && !content) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required ..." });
  }

  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "task title is required ..." });
  }

  if (!content) {
    return res
      .status(400)
      .json({ success: false, message: "task content is required ..." });
  }

  const existingTask = await existingTaskCheck(title);

  if (existingTask) {
    return res.status(400).json({
      success: false,
      message: "The task already exists with same title ...",
    });
  }

  const task = await Task.create({
    title,
    content,
    owner: req.user._id, // i also take id from cookie here
  });

  if (!task) {
    return res
      .status(400)
      .json({ success: false, message: "error in creating a task ..." });
  }

  return res
    .status(201)
    .json({ success: true, message: "Task created successfully ..." });
});

const updateTask = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { content } = req.body;

  if (!content) {
    return res
      .status(400)
      .json({ success: false, message: "Task content is required ..." });
  }

  const task = await Task.findOne({ _id: id });

  if (!task) {
    return res.status(400).json({ success: false, message: "Invalid request" });
  }

  task.content = content;

  task.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json({ success: true, message: "Task updated successfully ..." });
});

const deleteTask = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ success: false, message: "Invalid id ..." });
  }

  const task = await Task.findByIdAndDelete(id);

  if (!task) {
    return res
      .status(400)
      .json({ success: false, message: "Task not found ..." });
  }

  return res
    .status(200)
    .json({ success: true, message: "Task deleted successfully ..." });
});

const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ owner: req.user.id });

  if (!tasks) {
    return res.status(400).json({ success: false, message: "Tasks not found" });
  }

  return res
    .status(200)
    .json({ success: true, message: "All tasks fetch successfully", tasks });
});

const updateStatus = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  if (!status) {
    return res
      .status(400)
      .json({ success: false, message: "Status is required ..." });
  }

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "ID is not found ..." });
  }

  const task = await Task.findOne({ _id: id });

  if (!task) {
    return res
      .status(404)
      .json({ success: false, message: "Task not found ..." });
  }

  task.status = status;

  task.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json({ success: true, message: "Status updated successfully ..." });
});

const deleteAllTasks = asyncHandler(async (req, res) => {
  // Delete in one call and learn how many were removed
  const result = await Task.deleteMany({ owner: req.user.id });

  if (result.deletedCount === 0) {
    return res.status(404).json({ success: false, message: "No tasks found." });
  }

  return res.status(200).json({
    success: true,
    message: `Deleted ${result.deletedCount} task(s).`,
  });
});

export {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
  updateStatus,
  deleteAllTasks,
};
