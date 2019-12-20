const nodemailer = require("nodemailer");
function sendEmail(user) {
  const email = user.email;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `edwinsatyayudistira@gmail.com`,
      pass: `MARVEL0168`
    }
  });
  const mailOptions = {
    from: `edwinsatyayudistira@gmail.com`,
    to: `${email}`,
    subject: "Bismillah berkah dunia akhirat",
    html: `
        <h1>Tolong doakan</h1>
        <p>Amin</p>
        `
  };
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err);
  });
}
module.exports = sendEmail;
