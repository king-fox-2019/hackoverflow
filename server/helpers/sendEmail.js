const nodemailer = require('nodemailer');

function sendEmail(user) {
  const email = user.email;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `brahmantyasukma.developer@gmail.com`,
      pass: `prajanji88`
    }
  });

  const mailOptions = {
    from: `${process.env.GMAIL_ACCOUNT}`,
    to: `${email}`,
    subject: 'Hacktiv Overflow Invitations',
    html: `
        <p>to coincide with the birthday of Hackoverflow, we invite you to give us a greeting</p>
        `
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err)
      console.log(err)
    else
      console.log(info);
  });
}

module.exports = sendEmail;