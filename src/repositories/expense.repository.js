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
const addExpense = async (expenseValue, description,transactionType, userId) => {
  try {
    const query =
      "INSERT INTO expenses (expense_value, description,transaction_type, user_id) values ($1,$2,$3,$4) returning *";
    const result = await pool.query(query, [expenseValue, description,transactionType, userId]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Database Error adding expense");
  }
};

module.exports = { fetchExpenses, addExpense };
