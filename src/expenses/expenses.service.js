const expenseRepo = require("./expenses.repository.js");
const AppError = require("../utils/AppError.js");

const fetchExpenses = (userId) => expenseRepo.fetchExpenses(userId);

const addExpense = (expenseValue, description, transactionType, userId) =>
  expenseRepo.addExpense(expenseValue, description, transactionType, userId);

const deleteExpense = async (id, userId) => {
  const deletedExpense = await expenseRepo.deleteExpense(id, userId);
  if (!deletedExpense) {
    throw new AppError("Expense Not Found", 404);
  }
  return deletedExpense;
};

const getExpenseById = async (id, userId) => {
  const expense = await expenseRepo.fetchExpenseById(id, userId);
  if (!expense) {
    throw new AppError("Expense Not Found", 404);
  }
  return expense;
};

const updateExpense = async (
  id,
  expenseValue,
  description,
  transactionType,
  userId,
) => {
  const expense = await expenseRepo.updateExpense(
    id,
    expenseValue,
    description,
    transactionType,
    userId,
  );
  if (!expense) {
    throw new AppError("Expense not found", 404);
  }
  return expense;
};

const fetchAllExpenses = async () => expenseRepo.fetchAllExpenses();

module.exports = {
  fetchExpenses,
  addExpense,
  deleteExpense,
  getExpenseById,
  updateExpense,
  fetchAllExpenses,
};
