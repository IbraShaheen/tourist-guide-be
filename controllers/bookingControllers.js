const Booking = require("../models/Booking");
const Guide = require("../models/Guide");

exports.bookingList = async (_, res, next) => {
  try {
    const booking = await Booking.find()
      .populate("user", "-password")
      .populate({
        path: "guide",
        populate: {
          path: "user",
        },
      });
    res.json(booking);
  } catch (error) {
    next(error);
  }
};
exports.bookingCreate = async (req, res, next) => {
  // console.log(req.body)
  req.body.user = req.user.id;
  req.body.startingDate = req.body.choosenDates[0];
  req.body.endDate = req.body.choosenDates[req.body.choosenDates.length - 1];

  try {
    const newBooking = await Booking.create(req.body);
    await Guide.findByIdAndUpdate(req.body.guide, {
      $push: { notAvailabeDates: req.body.choosenDates },
    });
    //send grid
    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
};
exports.bookingDelete = async (req, res, next) => {
  try {
    const booking = await Booking.findById(
      { _id: req.params.bookingId },
      function (err) {
        if (err) {
          next({
            message: " you can't delete a booking that's not yours",
            status: 404,
          });
        }
      }
    );
    await Booking.deleteOne({ _id: req.params.bookingId });
    console.log(booking);

    const guide = await Guide.findByIdAndUpdate(
      booking.guide,
      {
        $pull: { notAvailabeDates: { $in: booking.choosenDates } },
      },
      { multi: true }
    );

    res.end();
  } catch (error) {
    next(error);
  }
};
