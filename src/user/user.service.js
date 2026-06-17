const userRepo = require("./user.repository");
const AppError = require("../utils/AppError");

const deleteUser = async (userId) => {
  const deletedUser = await userRepo.deleteUser(userId);

  if (!deletedUser) {
    throw new AppError("User not found", 404);
  }

  return deletedUser;
};
module.exports = { deleteUser };
