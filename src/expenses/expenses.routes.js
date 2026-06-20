const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/auth.middleware.js");
const expenseController = require("./expenses.controller.js");
const expenseValidator = require("./expenses.validation.js");
const validate = require("../middlewares/validation.middleware.js");
const authorize = require("../middlewares/authorize.middleware.js");

router
  .route("/")
  .get(
    authenticate,
    validate(expenseValidator.fetchExpensesSchema),
    expenseController.fetchExpenses,
  )
  .post(
    authenticate,
    validate(expenseValidator.addExpenseSchema),
    expenseController.addExpense,
  );

router.get('/all',
    authenticate,
    authorize("admin"),
    validate(expenseValidator.fetchExpensesSchema),
    expenseController.fetchAllExpenses,
  )

router
  .route("/:id")
  .get(
    authenticate,
    validate(expenseValidator.idParamsSchema),
    expenseController.getExpenseById,
  )
  .delete(
    authenticate,
    validate(expenseValidator.idParamsSchema),
    expenseController.deleteExpense,
  )
  .put(
    authenticate,
    validate(expenseValidator.updateExpenseSchema),
    expenseController.updateExpense,
  );

module.exports = router;
