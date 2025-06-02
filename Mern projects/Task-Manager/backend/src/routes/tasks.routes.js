import { Router } from "express";
import {
  createTask,
  deleteAllTasks,
  deleteTask,
  getAllTasks,
  updateStatus,
  updateTask,
} from "../controller/tasks.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/create").post(verifyJWT, createTask);
router.route("/edit/:id").patch(verifyJWT, updateTask);
router.route("/delete/:id").delete(verifyJWT, deleteTask);
router.route("/delete").delete(verifyJWT, deleteAllTasks);
router.route("/update-status/:id").patch(verifyJWT, updateStatus);
router.route("/get-all-tasks").get(verifyJWT, getAllTasks);

export { router };
