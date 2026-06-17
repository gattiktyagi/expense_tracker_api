const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/auth.middleware");
const userController = require("./user.controller");

router.delete("/", authenticate, userController.deleteUser);

module.exports = router;
