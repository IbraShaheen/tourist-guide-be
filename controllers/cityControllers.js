const City = require("../models/City");

exports.cityList = async (_, res, next) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (error) {
    next(error);
  }
};
