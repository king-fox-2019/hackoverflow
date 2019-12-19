const nodemailer = require("nodemailer");
async function main(email) {
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.GMAIL_EMAIL, // generated ethereal user
      pass: process.env.GMAIL_PASSWORD // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'madebydzaky@gmail.com', // sender address
    to: email, // list of receivers
    subject: "Hello from Stuck Overflow ✔", // Subject line
    text: "Have a great day!", // plain text body
    html: "<b>checkout our new question!, only on <a href='stuckoverflow.renotjaki.site'>stuckoverflow.renotjaki.site</a></b>" // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
module.exports = { main }