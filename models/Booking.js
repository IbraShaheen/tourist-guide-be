const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  choosenDates: {
    type: [],
  },

  groupSize: {
    type: Number,
    default: null,
  },
  startingDate: {
    type: String,
    default: "",
  },
  endDate: {
    type: String,
    default: "",
  },
  cityName: {
    type: String,
    default: "",
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  guide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guide",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", BookingSchema);
