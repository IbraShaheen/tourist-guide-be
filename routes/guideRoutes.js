// Libraries
const express = require("express");
const router = express.Router();
const passport = require("passport");

// Controllers
const {
  guideList,
  guideUpdate,
  guideSearch,
} = require("../controllers/guideControllers");

router.get("/guides", guideList);
router.put(
  "/guide/:guideId",
  passport.authenticate("jwt", { session: false }),
  guideUpdate
);
router.post("/search", guideSearch);

module.exports = router;
