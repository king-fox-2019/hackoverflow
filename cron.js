const cron = require("node-cron");
let nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  // The service which will be used to send the emails
  service: "gmail",
  //   credentials to send emails
  auth: {
    user: "windowswarrior.pig@gmail.com",
    pass: "NabilaR6"
  }
});

cron.schedule("0 45 17 * * 4", function() {
  console.log("-----------------");
  console.log("Running Cron Job");
  let mailOptions = {
    from: "windowswarrior.pig@gmail.com",
    to: "slimyhebat@gmail.com",
    subject: `hello`,
    text: `Sayang :*`
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      throw error;
    } else {
      console.log("email sent");
    }
  });
});
