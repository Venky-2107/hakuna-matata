const express = require("express");
const router = express.Router();
const adminLoginController = require('../controllers/admin/adminLogin.controller');
const userLoginController = require('../controllers/user/userLogin.controller')

//Routes for admin
router.post('/admin/signup', adminLoginController.registerAdmin);
router.post('/admin/login' , adminLoginController.loginAdmin);

//Routes for user
router.post('/user/signup', userLoginController.registerUser);
router.post('/user/login' , userLoginController.loginUser);

module.exports = router;
