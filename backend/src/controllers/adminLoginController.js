const admin_login = require("../models/adminRegisterModel");
const uuid = require("uuid");

const loginController = {};

loginController.registerUser = async function (req, res) {
  try {
    let newUser = new admin_login({ _id: uuid.v4(), ...req.body });
    newUser.save();
    res.status(200).send({ status: "Successfully uploaded", data: newUser });
  } catch (err) {
    res.status(400).send({ status: "Failed" });
  }
};

loginController.getAdminUser = async (req, res) => {
  try {
    let users = await admin_login.find();
    res.status(200).send({ status: "Successfully Fetched", data: users });
  } catch (err) {
    res.status(400).send({ status: "failed" });
  }
};

loginController.getUserById = async (req, res) => {
  try {
    let users = await admin_login.findById(req.params.id);
    res.status(200).send({ status: "Successfully Fetched", data: users });
  } catch (err) {
    res.status(400).send({ status: "failed" });
  }
};

loginController.updateUserById = async (req, res) => {
  try {
    let users = await admin_login.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.status(200).send({ status: "Successfully Fetched", data: users });
  } catch (err) {
    res.status(400).send({ status: "failed" });
  }
};

loginController.deleteUserById = async (req, res) => {
  try {
    let users = await admin_login.findByIdAndDelete(req.params.id);
    res.status(200).send({ status: "Successfully Fetched", data: users });
  } catch (err) {
    res.status(400).send({ status: "failed" });
  }
};

loginController.deleteUsers = async (req, res) => {
  try {
    let users = await admin_login.deleteMany();
    res.status(200).send({ status: "Successfully Fetched", data: users });
  } catch (err) {
    res.status(400).send({ status: "failed" });
  }
};

module.exports = loginController;
