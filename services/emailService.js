const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mhmhaseen1998@gmail.com",
    pass: "mhmhaseen98@",
  },
});

function sendWeatherReport(email, weatherData) {
  const mailOptions = {
    from: "mhmhaseen1998@gmail.com",
    to: email,
    subject: "Hourly Weather Report",
    text: `Hourly weather report for your location: ${weatherData}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Email error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

module.exports = { sendWeatherReport };
