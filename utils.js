const SgMail = require("@sendgrid/mail");
const { API_KEY } = require("./config/mailKey");
SgMail.setApiKey(API_KEY);

//
exports.sendBookingMail = async (user, userInsideGuide, newBooking, guide) => {
  let msg = {
    subject: "Booking Details",
    from: { name: "Guide Book ✈️", email: "ahmadabuawed@gmail.com" },
    to: [
      {
        name: `${user.fullname}`,
        // email: `${user.email}`,
        email: "engibraheem1995@gmail.com",
      },
      {
        name: `${userInsideGuide.fullname}`,
        email: `${userInsideGuide.email}`,
      },
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
          <td style="padding: 12px 15px; text-align: center;">$ ${
            newBooking.groupSize * guide.price * newBooking.choosenDates.length
          }</td>
          <td style="padding: 12px 15px; text-align: center;">${
            newBooking.groupSize
          }</td>
        <td style="padding: 12px 15px; text-align: center;">${
          newBooking.endDate
        }  &nbsp; ${newBooking.startingDate}</td>
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
};
//review
//send mail
exports.sendRatingMail = async (guideId, userEmail, user, endDate) => {
  let msg = {
    subject: "Guide Rating",
    from: { name: "Guide Book ✈️", email: "ahmadabuawed@gmail.com" },

    to: {
      name: `${user}`,
      email: `${userEmail}`,
      //email: "engibraheem1995@gmail.com",
      //   send_at: new Date(endDate).getTime() + 24 * 60 * 60 * 1000,
      send_at: new Date().getTime() + 5 * 60 * 1000,
    },

    // text:"",
    html: `<center >
    <legend><h2>Guide Rating</h2></legend>
   
    <p style="font-size: large; color: black; text-shadow: 2px 2px 10px green"> To Rate Your Previous Guide ,Please Click On The Link Below:  </p>
    <a href="http://localhost:3000/rating/${guideId}">Here<a/>
    </center>`,
  };
  try {
    await SgMail.send(msg);
    console.log(msg);
  } catch (error) {
    console.error(error);
  }
};
