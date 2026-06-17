const AppError = require("../utils/AppError");
const userService = require("./user.service");
const deleteUser = async (req, res) => {
  const userId = req.user.userId;
  if (!userId) {
    throw new AppError("User must be logged in to delete account", 400);
  }
  await userService.deleteUser(userId);

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
};
module.exports = { deleteUser };
