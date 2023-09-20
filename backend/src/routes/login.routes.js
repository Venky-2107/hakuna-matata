const express = require("express");
const router = express.Router();
const adminLoginController = require("../controllers/admin/adminLogin.controller");
const userLoginController = require("../controllers/user/userLogin.controller");
const addPropertyController = require("../controllers/admin/addProperty.controller");

//Routes for admin
router.post("/admin/signup", adminLoginController.registerAdmin);
router.post("/admin/login", adminLoginController.loginAdmin);

//Routes for user
router.post("/user/signup", userLoginController.registerUser);
router.post("/user/login", userLoginController.loginUser);

router.post("/admin/addProperty", addPropertyController.addProperty);
router.get("/admin/getProperty", addPropertyController.getProperty);

module.exports = router;
