const pool = require("../config/db");

const fetchExpenses = async (userId) => {
  const query = "SELECT * FROM expenses where user_id=$1";
  const result = await pool.query(query, [userId]);
  return result.rows;
};

const fetchExpenseById = async (id, userId) => {
  const query = "SELECT * FROM expenses where id=$1 and user_id=$2";
  const result = await pool.query(query, [id, userId]);
  return result.rows[0];
};

const addExpense = async (
  expenseValue,
  description,
  transactionType,
  userId,
) => {
  const query = `INSERT INTO expenses 
    (expense_value, description,transaction_type, user_id)
    values ($1,$2,$3,$4) returning *`;
  const result = await pool.query(query, [
    expenseValue,
    description,
    transactionType,
    userId,
  ]);
  return result.rows[0];
};

const deleteExpense = async (id, userId) => {
  const query = "DELETE FROM expenses WHERE id=$1 and user_id=$2 returning *";
  const result = await pool.query(query, [id, userId]);
  return result.rows[0];
};

module.exports = { fetchExpenses, addExpense, deleteExpense, fetchExpenseById };
