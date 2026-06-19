const express = require("express");
const router = express.Router();
const authController = require("./auth.controller.js");
const validate = require("../middlewares/validation.middleware.js");
const authValidator = require("./auth.validation.js");

router.post(
  "/register",
  validate(authValidator.signupSchema),
  authController.signup,
);
router.post(
  "/login",
  validate(authValidator.loginSchema),
  authController.login,
);

module.exports = router;
