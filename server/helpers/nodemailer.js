const nodemailer = require("nodemailer");
function sendEmail(user) {
  const email = user;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'go.mech.id@gmail.com',
        pass: 'hacktiv8'
    }
  });
  const mailOptions = {
    from: `go.mech.id@gmail.com`,
    to: `${email}`,
    subject: "YUK GABUNG!",
    html: `
        <h1>Yuk Bergabung dengan coders di StunOverflow</h1>
        <a>Link</a>
        `
  };
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err);
  });
}
module.exports = sendEmail;
