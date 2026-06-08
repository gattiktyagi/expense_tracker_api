const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/auth.middleware");
const expenseController = require("../controllers/expenses.controller");

router
  .route("/")
  .get(authenticate, expenseController.fetchExpenses)
  .post(authenticate, expenseController.addExpense);

router
  .route("/:id")
  .get(authenticate, expenseController.getExpenseById)
  .delete(authenticate, expenseController.deleteExpense);

module.exports = router;
