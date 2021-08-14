// Libraries
const express = require("express");
const passport = require("passport");
const router = express.Router();
const upload = require("../middleware/multer");
// Controllers
const {
  signup,
  signin,
  usersList,
  userUpdate,
} = require("../controllers/userControllers");

router.post("/signup", signup);

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.put(
  "/user/:userId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  userUpdate
);
router.get("/users", usersList);
module.exports = router;