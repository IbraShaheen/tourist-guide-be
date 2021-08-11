// Libraries
const express = require("express");
const passport = require("passport");
const router = express.Router();


// Controllers
const {guideList}=require("../controllers/guideControllers")

router.get("/guide",guideList);

module.exports = router;