const mongoose = require("mongoose");


const CountrySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
CountrySchema.virtual("cities",{ref:"City",
localField:"_id",foreignField:"country",
justOne:false})

module.exports = mongoose.model("Country", CountrySchema);
