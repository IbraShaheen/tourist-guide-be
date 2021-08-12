// Libraries
const express = require("express");
const router = express.Router();

// Controllers
const { guideList } = require("../controllers/guideControllers");

router.get("/guides", guideList);

module.exports = router;
