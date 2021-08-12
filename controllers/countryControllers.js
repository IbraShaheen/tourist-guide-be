const Country = require("../models/Country");
const City = require("../models/City");

exports.countriesCreate = async (req, res, next) => {
  try {
    const newCountry = await Country.create(req.body);
    res.status(201).json(newCountry);
  } catch (error) {
    next(error);
  }
};

exports.citiesCreate = async (req, res, next) => {
  const { countryId } = req.params;
  try {
    const foundCountry = await Country.findById(countryId);
    if (foundCountry) {
      req.body.country = countryId;
      const newCity = await City.create(req.body);

      res.status(201).json(newCity);
    } else {
      next({ message: "country not Found", status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

exports.countryList = async (_, res, next) => {
  try {
    const countries = await Country.find().populate("cities");
    res.json(countries);
  } catch (error) {
    next(error);
  }
};
