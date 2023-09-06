const express = require("express");
const router = express.Router();
const loginController = require("../controllers/adminLoginController");

router.post("/login", loginController.registerUser);

module.exports = router;
