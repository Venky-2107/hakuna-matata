const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminData = new Schema({
  _id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
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
  secret: {
    type: String,
    required: true,
  },
});

const adminlogin = new mongoose.model("adminLogin", adminData);
module.exports = adminlogin;
