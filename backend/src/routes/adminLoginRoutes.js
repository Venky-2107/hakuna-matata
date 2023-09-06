const express = require("express");
const router = express.Router();
const loginController = require("../controllers/adminLoginController");

router.post("/login", loginController.registerUser);
router.get("/users", loginController.getAdminUser);

module.exports = router;
