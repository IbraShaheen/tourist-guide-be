const mongoose = require("mongoose");

const GuideSchema = new mongoose.Schema({
  price: {
    type: Number,
    // default: 1
  },

  description: {
    type: String,
    // default:""
  },

  notAvailabeDates: {
    type: [],
  },
  
  cityname: {
    type: String,
    // default:""
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  maxsize :{
    type: Number,
  },

  
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // city: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "City",
  // },
});

module.exports = mongoose.model("Guide", GuideSchema);
