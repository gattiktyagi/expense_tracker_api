const authService = require("../services/auth.service");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { user, email, password } = req.body;
    if (!email || !user || !password) {
      return res.status(400).json({
        message: "All fields required",
      });
    }
    const newUser = await authService.signup(user, email, password);
    return res.status(201).json({
      message: "User created successfully",
      userId: newUser.id,
    });
  } catch (error) {
    if (error.message === "Email already registered") {
      return res.status(409).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);
    return res.status(200).json({
      message: "Login successful",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = { signup, login };
