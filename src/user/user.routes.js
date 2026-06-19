const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/auth.middleware.js");
const userController = require("./user.controller.js");
const validate = require("../middlewares/validation.middleware.js");
const userValidation = require("./user.validation.js");

router.delete(
  "/",
  authenticate,
  validate(userValidation.deleteUserSchema),
  userController.deleteUser,
);

module.exports = router;
