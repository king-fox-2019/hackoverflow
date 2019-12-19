var CronJob = require('cron').CronJob
const User = require('../models/user')
var nodemailer = require('nodemailer')
// const mongoose = require('mongoose')
// let time = '* * * * *' // 1 minute

// require('dotenv').config()

// mongoose.connect(process.env.MONGO_URI, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true})
//   .then(() => console.log('connected to database'))
//   .catch(err => console.log('failed to connect to database'))

// console.log(process.env.EMAIL);

let time = '0 6 * * 1'

function cron (){
  new CronJob(time, function() {
      console.log('masukkkkkk cornjobbbbb')
    User.find()
    .then(users => {
      users.forEach(user => {
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: `${process.env.EMAIL}`, // generated ethereal user
            
            pass: `${process.env.EMAIL_PASSWORD}` // generated ethereal password
          }
        });
          
        var mailOptions = {
          from: `${process.env.EMAIL}`,
          to: `${user.email}`,
          subject: 'Overflowing',
          text: `Hi, there ${user.email.split('@')[0]}. Mondays are great to greet a new a week full of optimism.
          And I bet you have never had a beautiful Monday morning than this one today.
          Wish you all the best!`
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
      console.log('Cron Job Failed to get users!')
    })
  }, null, true, 'Asia/Jakarta')
}

module.exports = cron