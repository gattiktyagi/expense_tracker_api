const AppError = require("../utils/AppError");
const authService = require("./auth.service");

const signup = async (req, res) => {
  const { user, email, password } = req.body;
  if (!email || !user || !password) {
    throw new AppError("All fields required", 400);
  }
  const newUser = await authService.signup(user, email, password);
  return res.status(201).json({
    message: "User created successfully",
    userId: newUser.id,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new AppError("All fields required", 400);
  }
  const result = await authService.login(email, password);
  return res.status(200).json({
    message: "Login successful",
    token: result.token,
    user: result.user,
  });
};

module.exports = { signup, login };
