// Libraries
const express = require("express");
const passport = require("passport");
const router = express.Router();

// Controllers
const { signup, signin, usersList } = require("../controllers/userControllers");

router.post("/signup", signup);

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.get("/users", usersList);
module.exports = router;
