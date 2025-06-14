import Router from "express";
import {
  createExpense,
  deleteExpense,
  getAllExpenses,
  getExpense,
  updateExpense,
} from "../controller/expense.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/create").post(verifyJWT, createExpense);
router.route("/update/:id").put(verifyJWT, updateExpense);
router.route("/delete/:id").delete(verifyJWT, deleteExpense);
router.route("/:id").get(verifyJWT, getExpense);
router.route("/").get(verifyJWT, getAllExpenses);

export default router;
