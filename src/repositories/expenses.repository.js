const pool = require("../config/db");

const fetchExpenses = async (userId) => {
  try {
    const query = "SELECT * FROM expenses where user_id=$1";
    const result = await pool.query(query, [userId]);
    return result.rows;
  } catch (error) {
    throw new Error("Database Error fetching expenses");
  }
};
const fetchExpenseById = async (id, userId) => {
  try {
    const query = "SELECT * FROM expenses where id=$1 and user_id=$2";
    const result = await pool.query(query, [id, userId]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Database Error fetching expense");
  }
};
const addExpense = async (
  expenseValue,
  description,
  transactionType,
  userId,
) => {
  try {
    const query =
      "INSERT INTO expenses (expense_value, description,transaction_type, user_id) values ($1,$2,$3,$4) returning *";
    const result = await pool.query(query, [
      expenseValue,
      description,
      transactionType,
      userId,
    ]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Database Error adding expense");
  }
};

const deleteExpense = async (id, userId) => {
  try {
    const query = "DELETE FROM expenses WHERE id=$1 and user_id=$2 returning *";
    const result = await pool.query(query, [id, userId]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Database Error deleting Expense");
  }
};

module.exports = { fetchExpenses, addExpense, deleteExpense, fetchExpenseById };
