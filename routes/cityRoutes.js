// Libraries
const express = require("express");
const router = express.Router();

// Controllers
const { cityList } = require("../controllers/cityControllers");

router.get("/cities", cityList);

module.exports = router;
