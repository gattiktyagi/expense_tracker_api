const expenseService = require("./expenses.service");

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
    const { expenseValue, description, transactionType } = req.body;
    if (!expenseValue) {
      return res.status(400).json({ message: "expenseValue required" });
    }
    const expense = await expenseService.addExpense(
      expenseValue,
      description,
      transactionType || "debit",
      userId,
    );

    res.status(201).json({ message: "New Expense Created", expense });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error adding expense", error: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.userId;
    if (!id) {
      return res
        .status(400)
        .json({ message: "Expense ID required to delete Expense" });
    }
    const deletedExpense = await expenseService.deleteExpense(id, userId);
    if (!deletedExpense) {
      return res.status(404).json({ message: "No such Expense Exist" });
    }
    return res
      .status(200)
      .json({ message: "Expense deleted successfully", deletedExpense });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Unable not delete Expense", error: error.message });
  }
};

const getExpenseById = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.userId;
  if (!id) {
    return res.status(400).json({ message: "Id required to fetch expense" });
  }
  try {
    const expense = await expenseService.getExpenseById(id, userId);
    if (!expense) {
      return res.status(404).json({ message: "No such expense Exist" });
    }
    return res
      .status(200)
      .json({ message: "Expense fetched successfully", expense });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Unable to fetch expense", error: error.message });
  }
};

module.exports = { fetchExpenses, addExpense, deleteExpense, getExpenseById };
