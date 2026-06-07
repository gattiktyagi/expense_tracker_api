const expenseService = require("../services/expenses.service");

const fetchExpenses = async (req, res) => {
  try {
    const userId = req.user.userId;
    const expenses = await expenseService.fetchExpenses(userId);
    res
      .status(200)
      .json({ message: "Expenses fetched successfully", expenses });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching expenses", error: error.message });
  }
};
const addExpense = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { expenseValue, description,transactionType } = req.body;
    if (!expenseValue) {
      return res.status(400).json({ message: "expenseValue required" });
    }
    const expense = await expenseService.addExpense(
      expenseValue,
      description,
      transactionType||'debit',
      userId,
    );

    res.status(201).json({ message: "New Expense Created", expense });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error adding expense", error: error.message });
  }
};

module.exports = { fetchExpenses, addExpense };
