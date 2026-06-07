const bcrypt = require("bcrypt");
const userRepository = require("../repositories/user.repository");
const jwt = require("jsonwebtoken");

const signup = async (user, email, password) => {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await userRepository.createUser(user, email, hashPassword);
  return newUser;
};

const login = async (email, password) => {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new Error("Invalid Credentials");
  }
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }
  const token = jwt.sign({ userId: user.id, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES_IN || "1h",
  });
  return { token, user: { id: user.id, email: user.email } };
};

module.exports = { signup, login };
