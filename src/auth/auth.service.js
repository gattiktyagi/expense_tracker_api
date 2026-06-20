const bcrypt = require("bcrypt");
const userRepository = require("../user/user.repository.js");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError.js");

const signup = async (user, email, password) => {
  const existingUserName = await userRepository.findByUser(user);

  if (existingUserName) {
    throw new AppError("Username not available", 409);
  }
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new AppError("Email already registered", 409);
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await userRepository.createUser(user, email, hashPassword);
  return newUser;
};

const login = async (email, password) => {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new AppError("Invalid Credentials", 401);
  }
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new AppError("Invalid Credentials", 401);
  }
  const token = jwt.sign({ userId: user.id, role:user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES_IN || "1h",
  });
  return { token, user: { id: user.id, email: user.email, role:user.role } };
};

module.exports = { signup, login };
