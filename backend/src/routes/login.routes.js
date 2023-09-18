const express = require("express");
const router = express.Router();
const adminLoginController = require('../controllers/admin/adminLogin.controller');

router.post('/admin/signup', adminLoginController.registerAdmin);
router.post('/admin/login' , adminLoginController.loginAdmin);

module.exports = router;
