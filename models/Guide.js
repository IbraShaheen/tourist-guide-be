const mongoose = require("mongoose");

const GuideSchema = new mongoose.Schema({
  price: {
    type: Number,
  },

  description: {
    type: String,
  },

  notAvailabeDates: {
    type: Array,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
  },
});

module.exports = mongoose.model("Guide", GuideSchema);
