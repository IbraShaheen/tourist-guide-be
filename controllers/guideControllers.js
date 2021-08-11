const Guide = require("../models/Guide")

exports.guideList = async (_, res, next) => {
    try {
      const guides = await Guide.find().populate('user');
      res.json(guides);
    } catch (error) {
      next(error);
    }
  };