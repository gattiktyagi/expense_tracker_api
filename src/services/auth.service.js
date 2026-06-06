const bcrypt = require("bcrypt");
const userRepository = require("../repositories/user.repository");

const signup = async (user, email, password) => {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await userRepository.createUser(user, email, hashPassword);
  return newUser;
};

module.exports = { signup };
