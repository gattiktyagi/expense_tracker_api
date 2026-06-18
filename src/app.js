const express = require("express");
const authRoutes = require("./auth/auth.routes.js");
const expenseRoutes = require("./expenses/expenses.routes.js");
const userRoutes = require("./user/user.routes.js");
const cors = require("cors");
const errorHandler = require("./middlewares/error.middleware.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  req.body = req.body || {};
  next();
});


app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/user", userRoutes);

app.use(errorHandler);

module.exports = app;
