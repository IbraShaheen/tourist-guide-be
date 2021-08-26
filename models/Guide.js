const mongoose = require("mongoose");

const GuideSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      default: null,
    },
    rating: {
      type: [],
    },

    description: {
      type: String,
      default: "",
    },

    notAvailabeDates: {
      type: [],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    maxsize: {
      type: Number,
      default: 1,
    },
    location: {
      type: [],
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

GuideSchema.virtual("avgOfRating").get(function () {
  if (this.rating.length !== 0) {


    return Math.ceil(this.rating.reduce((a, b) => a + b) / this.rating.length);
  } else {

    return 0;
  }
}),
  (module.exports = mongoose.model("Guide", GuideSchema));
