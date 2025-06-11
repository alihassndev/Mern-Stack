import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodo,
  updateTodo,
} from "../controller/todo.controller.js";

const router = Router();

router.route("/create").post(createTodo);
router.route("/update").put(updateTodo);
router.route("/delete").delete(deleteTodo);
router.route("/todo/:id").get(getTodo);
router.route("/todos").get(getAllTodos);

export default router;
