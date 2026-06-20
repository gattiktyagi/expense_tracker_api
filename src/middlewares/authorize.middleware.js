const AppError = require("../utils/AppError.js");

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new AppError("Authentication required", 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new AppError(
        "Forbidden: You do not have permission to access this resource",
        403,
      );
    }
    next();
  };
};

module.exports = authorize;
