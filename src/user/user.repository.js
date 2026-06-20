const pool = require("../config/db.js");

const findByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);
  return result.rows[0];
};

const findByUser = async (user) => {
  const result = await pool.query("SELECT * FROM users WHERE username=$1", [
    user,
  ]);
  return result.rows[0];
};

const createUser = async (username, email, hashedPassword) => {
  const role="user";
  const result = await pool.query(
    "INSERT INTO users (username,email,password_hash,role) VALUES ($1,$2,$3,$4) returning id, username, email,role",
    [username, email, hashedPassword, role],
  );
  return result.rows[0];
};

const deleteUser = async (userId) => {
  const result = await pool.query("Delete from users where id=$1 returning *", [userId]);
  return result.rows[0];
};

module.exports = { findByEmail, createUser, findByUser, deleteUser };
