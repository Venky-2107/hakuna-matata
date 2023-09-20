require("dotenv").config;
const jwt = require("jsonwebtoken");
const Admin = require("../../models/admin.model");
const Property = require("../../models/propertySchema.model");
const uuid = require("uuid");

const addPropertyController = {};

addPropertyController.addProperty = async (req, res) => {
  try {
    let token = await getToken(req.headers);
    const payload = jwt.verify(token, process.env.SECRET);
    if (payload) {
      let admin = await Admin.findById(payload._id);
      if (admin && token) {
        const alreadyRegisteredProperty = await Property.findOne({
          propertyEmail: req.body.propertyEmail,
        });
        if (!alreadyRegisteredProperty) {
          const propertyToBeAdded = new Property({
            ...req.body,
            _id: uuid.v4(),
            adminId: admin._id,
            adminName: admin.name,
          });
          await propertyToBeAdded.save();
          res.status(200).json({ status: "Success" });
        } else {
          res.status(400).json({
            status: "Failed",
            message: "property already exists with given email id",
          });
        }
      } else {
        res.status(400).json({ status: "Failed", message: "user not found" });
      }
    } else {
      res
        .status(400)
        .json({ status: "Failed", message: "user not authorized" });
    }
  } catch (err) {
    res.status(400).json({ status: "Failed", message: err.message });
  }
};

addPropertyController.getProperty = async (req, res) => {
  try {
    let token = await getToken(req.headers);
    console.log(token);
    const payload = jwt.verify(token, process.env.SECRET);
    if (payload) {
      const admin = await Admin.findById(payload._id);
      if (admin) {
        const property = await Property.findOne({ adminId: admin._id });
        if (property) {
          res.status(200).json({ status: "Success", message: property });
        } else {
          res
            .status(400)
            .json({ status: "Failed", message: "property not found" });
        }
      } else {
        res.status(400).json({ status: "Failed", message: "user not found" });
      }
    } else {
      res
        .status(400)
        .json({ status: "Failed", message: "user not authorized" });
    }
  } catch (err) {
    res.status(400).json({ status: "Failed", message: err.message });
  }
};

const getToken = (headers) => {
  if (headers && headers.authorization) {
    const fullToken = headers.authorization;
    const token = fullToken.split(" ");
    return token[1];
  }
  return null;
};

module.exports = addPropertyController;
