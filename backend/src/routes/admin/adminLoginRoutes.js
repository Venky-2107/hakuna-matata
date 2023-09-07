const express = require("express");
const router = express.Router();
const loginController = require("../../controllers/adminLoginController");

router.post("/login", loginController.registerUser);
router.get("/users", loginController.getAdminUser);
router.delete("/users", loginController.deleteUsers);
router.get("/users/:id", loginController.getUserById);
router.put("/users/:id", loginController.updateUserById);
router.delete("/users/:id", loginController.deleteUserById);

module.exports = router;
