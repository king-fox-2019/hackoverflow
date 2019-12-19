const nodemailer = require("nodemailer");

function sendEmail(user) {
  const email = user.email;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `gigs.in.ticket@gmail.com`,
      pass: `12345syx`
    }
  });

  const mailOptions = {
    from: `gigs.in.ticket@gmail.com`,
    to: `${email}`,
    subject: "Cron Job Is Work",
    html: `
        <h1>Cron Job it's work for you</h1>
        <p>wellcome</p>
        `
  };
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err);
  });
}
module.exports = sendEmail;
