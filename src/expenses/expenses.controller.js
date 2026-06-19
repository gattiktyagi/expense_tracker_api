const expenseService = require("./expenses.service.js");
const AppError = require("../utils/AppError.js");

const fetchExpenses = async (req, res) => {
  const userId = req.user.userId;
  const expenses = await expenseService.fetchExpenses(userId);
  res.status(200).json({ message: "Expenses fetched successfully", expenses });
};

const addExpense = async (req, res) => {
  const userId = req.user.userId;
  const { expenseValue, description, transactionType } = req.body;
  const expense = await expenseService.addExpense(
    expenseValue,
    description,
    transactionType || "debit",
    userId,
  );

  res.status(201).json({ message: "New Expense Created", expense });
};

const deleteExpense = async (req, res) => {
  const {id} = req.params;
  const userId = req.user.userId;
  const deletedExpense = await expenseService.deleteExpense(id, userId);

  return res
    .status(200)
    .json({ message: "Expense deleted successfully", deletedExpense });
};

const getExpenseById = async (req, res) => {
  const {id} = req.params;
  const userId = req.user.userId;
  const expense = await expenseService.getExpenseById(id, userId);
  return res
    .status(200)
    .json({ message: "Expense fetched successfully", expense });
};

const updateExpense = async (req, res) => {
  const userId = req.user.userId;
  const id = req.params.id;
  const { expenseValue, description, transactionType } = req.body;

  const expense = await expenseService.updateExpense(
    id,
    expenseValue,
    description,
    transactionType || "debit",
    userId,
  );
  res.status(200).json({
    success: true,
    message: `Expense with id ${id} updated successfully`,
    data: {
      expense,
    },
  });
};

module.exports = {
  fetchExpenses,
  addExpense,
  deleteExpense,
  getExpenseById,
  updateExpense,
};
