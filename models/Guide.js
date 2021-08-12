const mongoose = require("mongoose");

const GuideSchema = new mongoose.Schema({
  price: {
    type: Number,
  },

  description: {
    type: String,
  },

  notAvailabeDates: {
    type: [],
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Guide", GuideSchema);
