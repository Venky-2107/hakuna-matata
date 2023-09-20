const mongoose = require("mongoose");
const { Schema } = mongoose;

const property = new Schema({
  _id: {
    type: String,
    required: true,
  },
  propertyName: {
    type: String,
    required: true,
  },
  propertyType: {
    type: String,
    required: true,
  },
  propertyEmail: {
    type: String,
    required: true,
  },
  propertyContact: {
    type: Number,
    required: true,
  },
  propertyAdress: {
    type: Object,
    required: true,
    properties: {
      adressFirstLine: {
        type: String,
        required: true,
      },
      adressLastLine: {
        type: String,
        required: true,
      },
      State: {
        type: String,
        required: true,
      },
      pincode: {
        type: Number,
        required: true,
      },
    },
  },
  roomsCount: {
    type: Number,
    required: true,
  },
  roomType: {
    type: Object,
    properties: {
      oneSharing: {
        type: Number,
        isAvailable: Boolean,
      },
      twoSharing: {
        type: Number,
        isAvailable: Boolean,
      },
      threeSharing: {
        type: Number,
        isAvailable: Boolean,
      },
      fourSharing: {
        type: Number,
        isAvailable: Boolean,
      },
      fiveSharing: {
        type: Number,
        isAvailable: Boolean,
      },
    },
  },
  description: {
    type: String,
  },
  adminId: {
    type: String,
    required: true,
  },
  adminName: {
    type: String,
    required: true,
  },
});

const propertyData = mongoose.model("property_data", property);
module.exports = propertyData;
