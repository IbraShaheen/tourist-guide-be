const Guide = require("../models/Guide")

exports.guideList = async (req, res, next) => {
    try {
      console.log(req.body)
      const guides = await Guide.find().populate('user').populate('city');
      res.json(guides);
    } catch (error) {
      next(error);
    }
  };