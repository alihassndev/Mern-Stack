import { Expense } from "../model/expense.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createExpense = asyncHandler(async (req, res) => {
  const { title, amount, category } = req.body;
  const user = req.user;

  if (
    [title, amount, category].some(
      (field) => field === "" || field === undefined
    )
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required ..." });
  }

  const expense = await Expense.create({
    title,
    amount,
    category,
    user: user._id,
  });

  if (!expense) {
    return res
      .status(500)
      .json({ success: false, message: "Error in creating expense ..." });
  }

  return res
    .status(200)
    .json({ success: true, message: "expense created successfully ..." });
});

const getAllExpenses = asyncHandler(async (req, res) => {
  const user = req.user;

  const expenses = await Expense.find({ user: user._id });

  if (!expenses) {
    return res
      .status(404)
      .json({ success: false, message: "Expenses not found ..." });
  }

  return res
    .status(200)
    .json({ success: true, message: "Expense(s) are fetched ...", expenses });
});

const getExpense = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const expense = await Expense.findOne({ _id: id });

  if (!expense) {
    return res
      .status(404)
      .json({ success: false, message: "Expenses not found ..." });
  }

  return res
    .status(200)
    .json({ success: true, message: "Expense found ...", expense });
});

const updateExpense = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { title, amount, category, date } = req.body;

  if (!title && !amount && !category && !date) {
    return res.status(400).json({
      success: false,
      message: "At least one field is required to update",
    });
  }

  // Build update object dynamically
  const updates = {};
  if (title) updates.title = title;
  if (amount) updates.amount = amount;
  if (category) updates.category = category;
  if (date) updates.date = date;

  const updatedExpense = await Expense.findOneAndUpdate(
    { _id: id, user: req.user._id }, // only allow updating own expenses
    updates,
    { new: true, runValidators: true }
  );

  if (!updatedExpense) {
    return res
      .status(404)
      .json({ success: false, message: "Expense not found or update failed" });
  }

  return res.status(200).json({
    success: true,
    message: "Expense updated successfully",
    data: updatedExpense,
  });
});

const deleteExpense = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const expense = await Expense.findOne({ _id: id });

  if (!expense) {
    return res
      .status(404)
      .json({ success: false, message: "Expense not found ..." });
  }

  const deletedExpense = await Expense.findByIdAndDelete(id);

  if (!deleteExpense) {
    return res
      .status(500)
      .json({ success: false, message: "Error in deleting expense ..." });
  }

  return res
    .status(200)
    .json({ success: true, message: "Expense deleted successfully ..." });
});

export {
  createExpense,
  deleteExpense,
  updateExpense,
  getExpense,
  getAllExpenses,
};
