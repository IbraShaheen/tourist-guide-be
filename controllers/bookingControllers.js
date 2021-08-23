const Booking = require("../models/Booking");
const Guide = require("../models/Guide");
const User = require("../models/User")
const SgMail = require("@sendgrid/mail");
const {API_KEY }= require("../config/mailKey")
SgMail.setApiKey(
  API_KEY
);

//
const sendMail = async(user,userInsideGuide,newBooking,guide)=>{
let msg = {
  subject: "Booking Details",
  from: { name: "Guide Book ✈️", email: "ahmadabuawed@gmail.com" },
  to: [
    {
      name: `${user.fullname}`,
      // email: `${user.email}`,
      email:"engibraheem1995@gmail.com"
    },
    { name: `${userInsideGuide.fullname}`, email: `${userInsideGuide.email}` },
  ],
  // text:"",
  html: `<center >
  <legend><h2>New Booking Details</h2></legend>
  <table style="    border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);">
  <thead>
      <tr style="    background-color: #ffb703;
      color: #ffffff;
      text-align: left;">
          <th style="    background-color: #ffb703;
          color: #ffffff; padding: 12px 15px;
          text-align: center;">Total Price</th>

          <th style="    background-color: #ffb703;
          color: #ffffff; text-align: center;
           padding: 12px 15px;">Group Size</th>

           <th style="    background-color: #ffb703;
           color: #ffffff ; text-align: center;
            padding: 12px 15px;">Duration</th>

            <th style="    background-color: #ffb703;
            color: #ffffff ; text-align: center;
             padding: 12px 15px;">Guide Name</th>

             <th style="    background-color: #ffb703;
             color: #ffffff ; text-align: center;
              padding: 12px 15px;">Tourist Name</th>
      </tr>
  </thead>
  <tbody style="border-bottom: 1px solid #dddddd;">
      <tr style="border-bottom: 1px solid #dddddd;">
          <td style="padding: 12px 15px; text-align: center;">${
            newBooking.groupSize * guide.price 
          }</td>
          <td style="padding: 12px 15px; text-align: center;">${
            newBooking.groupSize
          }</td>
        <td style="padding: 12px 15px; text-align: center;">${
          newBooking.endDate
        }  ${newBooking.startingDate}-</td>
          <td style="padding: 12px 15px; text-align: center;">${
             userInsideGuide.fullname
          }</td>
          <td style="padding: 12px 15px; text-align: center;">${
            user.fullname
          }</td>

      </tr>
      
  </tbody>
  </table>
  <p style="font-size: large; color: black; text-shadow: 2px 2px 10px green"> Enjoy your trip ✈️  </p>
  </center>`,
};
try {
  await SgMail.send(msg);
  console.log(msg);
} catch (error) {
  console.error(error);
}
}



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
   const guide= await Guide.findByIdAndUpdate(req.body.guide, {
      $push: { notAvailabeDates: req.body.choosenDates },
    });
    const user = await User.findById({_id:newBooking.user})
    const userInsideGuide = await User.findById({_id:guide.user})
  
    // sendMail(user,userInsideGuide,newBooking,guide);
    
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
