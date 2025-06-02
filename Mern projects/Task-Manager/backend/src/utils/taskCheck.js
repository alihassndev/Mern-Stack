import { Task } from "../model/tasks.model.js";
import { asyncHandler } from "./asyncHandler.js";

const existingTaskCheck = async (title) => {
  const existingTask = await Task.findOne({ title });
  return existingTask;
};

export { existingTaskCheck };
