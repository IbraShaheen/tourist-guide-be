const Guide = require("../models/Guide");

exports.guideList = async (req, res, next) => {
  try {
    console.log(req.body);
    const guides = await Guide.find().populate("user").populate("city");
    res.json(guides);
  } catch (error) {
    next(error);
  }
};

exports.guideUpdate = async (req, res, next) => {
  try {
    Guide.findOneAndUpdate(
      { _id: req.params.guideId },
      req.body,
      { new: true },
      function (err, guide) {
        if (err) {
          next({ message: "guide not Found", status: 404 });
        }
        res.json(guide);
      }
    ).populate("user").populate("city");
  } catch (error) {
    next(error);
  }
};
exports.guideSearch = async (req, res, next) => {
  try {
    console.log(req.body);
    const guides = await Guide.find({
      city: req.body.city,
      maxsize: { $gte: req.body.maxsize },
      notAvailabeDates: { $nin: req.body.dates },
    }).populate("user");
    res.json(guides);
  } catch (error) {
    next(error);
  }
};