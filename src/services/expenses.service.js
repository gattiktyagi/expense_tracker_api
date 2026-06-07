const expenseRepo = require("../repositories/expense.repository");

const fetchExpenses = async (userId) => {
  try {
    const expenses = await expenseRepo.fetchExpenses(userId);
    return expenses;
  } catch (error) {
    throw new Error("Unable to Fetch Expenses");
  }
};

const addExpense = async (expenseValue, description,transactionType, userId) => {
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

module.exports = { fetchExpenses, addExpense };
