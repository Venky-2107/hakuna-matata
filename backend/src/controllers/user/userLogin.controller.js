require("dotenv").config;
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const User = require("../../models/user.model");
const jwt = require("jsonwebtoken");

const userLoginController = {};

userLoginController.registerUser = async (req, res) => {
  try {
    const isAlreadyUser = await User.findOne({ email: req.body.email });
    if (!isAlreadyUser) {
      const { password, secret } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const hashedSecret = await bcrypt.hash(secret, 10);
      const newUser = new User({
        _id: uuid.v4(),
        ...req.body,
        password: hashedPassword,
        secret: hashedSecret,
      });
      await newUser.save();
      res.status(200).json({ status: "Success" });
    } else {
      res
        .status(404)
        .json({ status: "failed", message: "User already exists" });
    }
  } catch (err) {
    res.status(400).json({ status: "failed", message: err.message });
  }
};

userLoginController.loginUser = async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const { username, email, contact, secret, dob } = user;
        let token = await jwt.sign(
          { username, email, contact, secret, dob },
          process.env.SECRET
        );
        res.status(200).json({ status: "success", token: token });
      } else {
        res
          .status(400)
          .json({ status: "failed", message: "password does not match..." });
      }
    } else {
      res
        .status(400)
        .json({ status: "failed", message: "user does not exist..." });
    }
  } catch (err) {
    res.status(400).json({ status: "failed", message: err.message });
  }
};
module.exports = userLoginController;
