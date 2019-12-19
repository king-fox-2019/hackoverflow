const CronJob = require('node-cron');
const nodemailer = require('nodemailer')
// new CronJob('0 15 18 * * *', function () {
//     console.log('You will see this message every second');
// }, null, true, 'Asia/Jakarta');

module.exports = CronJob

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASS
    }
});
// sending emails at periodic intervals
CronJob.schedule("0 * * * * *", function () {
    console.log("---------------------");
    console.log("Running Cron Job");
    let mailOptions = {
        from: "COMPANYEMAIL@gmail.com",
        to: "rdforces@gmail.com",
        subject: `Not a GDPR update ;)`,
        text: `Hi there, this email was automatically sent by us`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            throw error;
        } else {
            console.log("Email successfully sent!");
        }
    });
});
