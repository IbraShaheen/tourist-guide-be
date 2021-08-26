const Guide = require("../models/Guide");

exports.guideList = async (req, res, next) => {
  try {
    const guides = await Guide.find().populate("user").populate("city");
    res.json(guides);
  } catch (error) {
    next(error);
  }
};

exports.guideUpdate = async (req, res, next) => {
  try {
    if (req.body.rating) {
      Guide.findOneAndUpdate(
        { _id: req.params.guideId },
        {
          $push: { rating: +req.body.rating },
        },

        { new: true },
        function (err, guide) {
          if (err) {
            next({ message: "guide not Found", status: 404 });
          }
          res.json(guide);
        }
      )
        .populate("user")
        .populate("city");
    } else {
      Guide.findOneAndUpdate(
        { _id: req.params.guideId },
        {
          price: req.body.price,
          description: req.body.description,
          maxsize: req.body.maxsize,
          city: req.body.city,
          notAvailabeDates: req.body.notAvailabeDates,
          location: req.body.location,
        },

        { new: true },
        function (err, guide) {
          if (err) {
            next({ message: "guide not Found", status: 404 });
          }
          res.json(guide);
        }
      )
        .populate("user")
        .populate("city");
    }
  } catch (error) {
    next(error);
  }
};

exports.guideSearch = async (req, res, next) => {
  try {
    const guides = await Guide.find({
      city: req.body.city,
      maxsize: { $gte: req.body.maxsize },
      notAvailabeDates: { $nin: req.body.dates },
    })
      .populate("user")
      .populate("city");
    res.json(guides);
  } catch (error) {
    next(error);
  }
};
