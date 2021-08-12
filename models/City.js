const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema({
  name: {
    type: String,
  },

  image: {
    type: String,
  },

  description: {
    type: String,
  },

  country: {
    type: mongoose.Schema.ObjectId,
    ref: "Country",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("City", CitySchema);
