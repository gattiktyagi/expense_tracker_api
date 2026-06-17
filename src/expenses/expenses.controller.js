const expenseService = require("./expenses.service");
const AppError = require("../utils/AppError");

const fetchExpenses = async (req, res) => {
  const userId = req.user.userId;
  const expenses = await expenseService.fetchExpenses(userId);
  res.status(200).json({ message: "Expenses fetched successfully", expenses });
};

const addExpense = async (req, res) => {
  const userId = req.user.userId;
  const { expenseValue, description, transactionType } = req.body;
  if (expenseValue === null || expenseValue === undefined) {
    throw new AppError("expenseValue Required", 400);
  }
  const expense = await expenseService.addExpense(
    expenseValue,
    description,
    transactionType || "debit",
    userId,
  );

  res.status(201).json({ message: "New Expense Created", expense });
};

const deleteExpense = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.userId;
  if (!id) {
    throw new AppError("Expense id required to delete expense", 400);
  }
  const deletedExpense = await expenseService.deleteExpense(id, userId);

  return res
    .status(200)
    .json({ message: "Expense deleted successfully", deletedExpense });
};

const getExpenseById = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.userId;
  if (!id) {
    throw new AppError("Id required to fetch expense", 400);
  }
  const expense = await expenseService.getExpenseById(id, userId);
  return res
    .status(200)
    .json({ message: "Expense fetched successfully", expense });
};

const updateExpense = async (req, res) => {
  const userId = req.user.userId;

  const id = req.params.id;
  if (!id) {
    throw new AppError("Id required to update expense", 400);
  }
  const { expenseValue, description, transactionType } = req.body;
  if (expenseValue === null || expenseValue === undefined) {
    throw new AppError("Expense value required", 400);
  }
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
