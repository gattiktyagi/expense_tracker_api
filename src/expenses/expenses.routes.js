const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/auth.middleware");
const expenseController = require("./expenses.controller");

router
  .route("/")
  .get(authenticate, expenseController.fetchExpenses)
  .post(authenticate, expenseController.addExpense);

router
  .route("/:id")
  .get(authenticate, expenseController.getExpenseById)
  .delete(authenticate, expenseController.deleteExpense)
  .put(authenticate, expenseController.updateExpense);

module.exports = router;
