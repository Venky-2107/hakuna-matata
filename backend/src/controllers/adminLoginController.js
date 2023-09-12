const adminRegister = require("../models/adminRegisterModel");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

const loginController = {};

loginController.registerUser = async function (req, res) {
  try {
    let { password, secret } = req.body;
    let hashedPassword = await bcrypt.hash(password, 12);
    let hashedSecret = await bcrypt.hash(secret, 12);
    let newUser = new adminRegister({
      _id: uuid.v4(),
      ...req.body,
      password: hashedPassword,
      secret: hashedSecret,
    });
    await newUser.save();
    res.status(200).send({ status: "Successfully uploaded", data: newUser });
  } catch (err) {
    res.status(400).send({ status: "Failed" });
  }
};

loginController.getAdminUser = async (req, res) => {
  try {
    let users = await adminRegister.find();
    res.status(200).send({ status: "Successfully Fetched", data: users });
  } catch (err) {
    res.status(400).send({ status: "failed" });
  }
};

loginController.getUserById = async (req, res) => {
  try {
    let users = await adminRegister.findById(req.params.id);
    res.status(200).send({ status: "Successfully Fetched", data: users });
  } catch (err) {
    res.status(400).send({ status: "failed" });
  }
};

loginController.getUserLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await adminRegister.findOne({ email });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (user) {
      if (passwordMatch) {
        res.status(200).send({ status: "Successfully Fetched", data: user });
      } else {
        res
          .status(401)
          .json({ status: "failed", message: "password not matching" });
      }
    } else {
      res.status(401).send({
        status: "failed",
        message: "user not found",
      });
    }
  } catch (err) {
    res.status(400).send({ status: "failed" });
  }
};

loginController.updateUserById = async (req, res) => {
  try {
    let users = await adminRegister.findByIdAndUpdate(
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
    let users = await adminRegister.findByIdAndDelete(req.params.id);
    res.status(200).send({ status: "Successfully Fetched", data: users });
  } catch (err) {
    res.status(400).send({ status: "failed" });
  }
};

loginController.deleteUsers = async (req, res) => {
  try {
    let users = await adminRegister.deleteMany();
    res.status(200).send({ status: "Successfully Fetched", data: users });
  } catch (err) {
    res.status(400).send({ status: "failed" });
  }
};

module.exports = loginController;
