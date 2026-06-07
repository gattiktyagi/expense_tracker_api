const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/auth.middleware");
const expenseController = require("../controllers/expenses.controller");

router
  .route("/")
  .get(authenticate, expenseController.fetchExpenses)
  .post(authenticate, expenseController.addExpense);

module.exports = router;
