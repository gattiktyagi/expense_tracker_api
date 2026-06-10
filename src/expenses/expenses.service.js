const expenseRepo = require("./expenses.repository");

const fetchExpenses = async (userId) => {
  try {
    const expenses = await expenseRepo.fetchExpenses(userId);
    return expenses;
  } catch (error) {
    throw new Error("Unable to Fetch Expenses");
  }
};

const addExpense = async (
  expenseValue,
  description,
  transactionType,
  userId,
) => {
  try {
    const expense = await expenseRepo.addExpense(
      expenseValue,
      description,
      transactionType,
      userId,
    );
    return expense;
  } catch (error) {
    throw new Error("Unable to Add Expense");
  }
};

const deleteExpense = async (id, userId) => {
  try {
    const deletedExpense = await expenseRepo.deleteExpense(id, userId);
    return deletedExpense;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getExpenseById = async (id, userId) => {
  try {
    const expense = await expenseRepo.fetchExpenseById(id, userId);
    return expense;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { fetchExpenses, addExpense, deleteExpense, getExpenseById };
