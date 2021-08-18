// Libraries
const express = require("express");
const router = express.Router();
const passport = require("passport");

// Controllers
const {
  bookingList,
  bookingCreate,
} = require("../controllers/bookingControllers");

router.get("/booking", bookingList);
router.post(
  "/booking",
  passport.authenticate("jwt", { session: false }),
  bookingCreate
);

module.exports = router;
