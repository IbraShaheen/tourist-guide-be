const Booking = require("../models/Booking");
const Guide = require("../models/Guide");
const User = require("../models/User");
const { sendRatingMail, sendBookingMail } = require("../utils");
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
  req.body.user = req.user.id;
  req.body.startingDate = req.body.choosenDates[0];
  req.body.endDate = req.body.choosenDates[req.body.choosenDates.length - 1];

  try {
    const newBooking = await Booking.create(req.body);
    const guide = await Guide.findByIdAndUpdate(req.body.guide, {
      $push: { notAvailabeDates: req.body.choosenDates },
    });
    const user = await User.findById({ _id: newBooking.user });
    const userInsideGuide = await User.findById({ _id: guide.user });

    sendBookingMail(user, userInsideGuide, newBooking, guide);
    sendRatingMail(
      req.body.guide,
      user.email,
      user.fullname,
      newBooking.endDate
    );

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
