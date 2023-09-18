const mongoose = require("mongoose");
const { Schema } = mongoose;

const userData = new Schema({
  _id: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  secret: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("userRegister", userData);
module.exports = User;
