import mongoose from "mongoose";
const { Schema } = mongoose;

const adminData = new Schema({
  id: {
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
    type: Number,
    required: true,
  },
  secret: {
    type: String,
    required: true,
  },
});

const adminlogin = new mongoose.model("adminLogin", adminData);
module.exports(adminlogin);
