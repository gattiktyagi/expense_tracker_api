const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/auth.middleware.js");
const userController = require("./user.controller.js");

router.delete("/", authenticate, userController.deleteUser);

module.exports = router;
