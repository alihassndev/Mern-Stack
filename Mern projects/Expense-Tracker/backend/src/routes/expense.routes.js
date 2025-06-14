import Router from "express";
import {
  createExpense,
  deleteExpense,
  getAllExpenses,
  getCategoryStats,
  getExpense,
  getMonthlyStats,
  getSpecificExpenses,
  updateExpense,
} from "../controller/expense.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/create").post(verifyJWT, createExpense);
router.route("/update/:id").put(verifyJWT, updateExpense);
router.route("/delete/:id").delete(verifyJWT, deleteExpense);
router.route("/:id").get(verifyJWT, getExpense);
router.route("/").get(verifyJWT, getAllExpenses);
router.route("/stats/monthly").get(verifyJWT, getMonthlyStats);
router.route("/stats/category").get(verifyJWT, getCategoryStats);
router.route("/specific").get(verifyJWT, getSpecificExpenses);

export default router;
