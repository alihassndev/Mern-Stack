import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodo,
  updateTodo,
} from "../controller/todo.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/create").post(verifyJWT, createTodo);
router.route("/update/:id").put(verifyJWT, updateTodo);
router.route("/delete/:id").delete(verifyJWT, deleteTodo);
router.route("/todo/:id").get(verifyJWT, getTodo);
router.route("/").get(verifyJWT, getAllTodos);

export default router;
