const pool = require("../config/db");

const fetchExpenses = async (userId) => {
  const query =
    "SELECT id, expense_value,  description, transaction_type ,transaction_at FROM expenses where user_id=$1";
  const result = await pool.query(query, [userId]);
  return result.rows;
};

const fetchExpenseById = async (id, userId) => {
  const query =
    "SELECT id, expense_value,  description, transaction_type ,transaction_at FROM expenses where id=$1 and user_id=$2";
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
    values ($1,$2,$3,$4) returning id, expense_value,  description, transaction_type ,transaction_at`;
  const result = await pool.query(query, [
    expenseValue,
    description,
    transactionType,
    userId,
  ]);
  return result.rows[0];
};

const deleteExpense = async (id, userId) => {
  const query =
    "DELETE FROM expenses WHERE id=$1 and user_id=$2 returning id, expense_value,  description, transaction_type ,transaction_at";
  const result = await pool.query(query, [id, userId]);
  return result.rows[0];
};

const updateExpense = async (
  id,
  expenseValue,
  description,
  transactionType,
  userId,
) => {
  const query = `UPDATE expenses SET expense_value=$1,description=$2, transaction_type=$3 WHERE user_id=$4 AND id=$5  returning id, expense_value,  description, transaction_type ,transaction_at`;
  const expense = await pool.query(query, [
    expenseValue,
    description,
    transactionType,
    userId,
    id,
  ]);
  return expense.rows[0];
};

module.exports = {
  fetchExpenses,
  addExpense,
  deleteExpense,
  fetchExpenseById,
  updateExpense,
};
