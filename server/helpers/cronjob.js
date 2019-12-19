var CronJob = require('cron').CronJob
const User = require('../models/user')
var nodemailer = require('nodemailer')
// let time = '* * * * *' // 1 minute
let time = '00 06 22 * *'

function cron() {
    new CronJob(time, function () {
        User.find({})
            .then(users => {
                users.forEach(dataUser => {
                    let transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                            user: `${process.env.EMAIL}`,
                            pass: `${process.env.PASSWORDEMAIL}`
                        }
                    });

                    var mailOptions = {
                        from: `${process.env.EMAIL}`,
                        to: `${dataUser.email}`,
                        subject: 'Stuck Overflow',
                        text: `
                        Halo ${dataUser.username}, I am from Stuck Overflow.
                        It's been a month since you join Stuck Overflow.
                        Go checkout what's trending now in our website.
                        http://stuckoverflow.s3-website-ap-southeast-1.amazonaws.com


                        Thank you,
                        ark - stuckoverflow
                        `
                    }
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error.message)
                        } else {
                            console.log(info.response)
                        }
                    })

                })
            })
            .catch(err => {
                console.log('Cron Job Failed to get users!')
            })
    }, null, true, 'Asia/Jakarta')
}

module.exports = cron