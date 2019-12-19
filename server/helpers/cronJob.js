var CronJob = require('cron').CronJob
var nodemailer = require('nodemailer')
const User = require('../models/User')

let time = '0 6 1 * *'

function cron (){
  new CronJob(time, function() {
    User.find({})
    .then(users => {
      users.forEach(user => {
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: `${process.env.CRON_EMAIL}`,
            pass: `${process.env.CRON_EMAIL_PASSWORD}`
          }
        });
          
        var mailOptions = {
          from: `${process.env.CRON_EMAIL}`,
          to: `${user.email}`,
          subject: 'Hacktiflow',
          text: `Hello ${user.name}! Please check out our monthly newsletter on the link below.`
        }
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error.message)
          } else {
            console.log(info.response)
          }
        })

      })
    })
    .catch(err => {
      console.log(err.response)
    })
  }, null, true, 'Asia/Jakarta')
}

module.exports = cron