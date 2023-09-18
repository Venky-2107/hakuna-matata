const uuid = require("uuid");
const bcrypt = require("bcrypt");
const Admin = require('../../models/admin.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const loginController = {};

loginController.registerAdmin = async function (req, res) {
  try {
    let admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      let { password, secret } = req.body;
      let hashedPassword = await bcrypt.hash(password, 12);
      let hashedSecret = await bcrypt.hash(secret, 12);
      let newUser = await new Admin({
        _id: uuid.v4(),
        ...req.body,
        password: hashedPassword,
        secret: hashedSecret,
      });
      await newUser.save();
      res.status(200).json({ status: "Success" })
    }
    else {
      res.status(401).json({ status: "Failed", message: "Email already exists..." })
    }
  } catch (err) {
    res.status(400).json({ status: "Failed", message: err.message });
  }
};

loginController.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (admin) {
      const validPassword = await bcrypt.compare(password, admin.password);
      if (validPassword) {
        const { name, email, contact, _id, secret } = admin;
        const token = await jwt.sign({ name, email, contact, _id, secret }, process.env.SECRET);
        res.status(200).json({ status: 'Success', token: `JWT ${token}` });
      }
      else {
        res.status(400).json({ status: "Failed", message: "Invalid Password..." });
      }
    }
    else {
      res.status(404).json({ status: "Failed", message: "User not found" });
    }
  }
  catch (err) {
    res.status(400).json({ status: "Failed", message: err.message });
  }
}

loginController.getAdminById = async (req, res) => {
  try {
    let users = await Admin.findById(req.params.id);
    res.status(200).send({ status: "Success", data: users });
  } catch (err) {
    res.status(400).send({ status: "failed" });
  }
};

module.exports = loginController;
