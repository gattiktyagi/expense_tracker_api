const express = require("express");
const authRoutes = require("./auth/auth.routes");
const expenseRoutes = require("./expenses/expenses.routes");
const cors=require('cors');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

app.use(errorHandler);

module.exports = app;
