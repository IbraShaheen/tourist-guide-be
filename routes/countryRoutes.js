// Libraries
const express = require("express");
const router = express.Router();

// Controllers
const {countriesCreate, citiesCreate, countryList} = require("../controllers/countryControllers")

router.post("/countries",countriesCreate);

router.post("/countries/:countryId/cities",citiesCreate)

router.get("/countries",countryList)

module.exports = router;