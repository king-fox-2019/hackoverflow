const cron = require('node-cron')
const nodemailer = require('nodemailer')
const { User } = require('./models')

module.exports = () => {
  let emails = []
  User.find()
    .then(users => {
      users.forEach(user => {
        emails.push(user.email)
      })

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "",
          pass: ""
        }
      })
      cron.schedule("17 11 * 12 *", function() {
        let mailOptions = {
          from: "ngulikpustaka@gmail.com",
          to: emails,
          subject: 'Hello from HackOverflow!',
          text: 'How are you?'
        };
        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            throw error
          } else {
            console.log("Email sent!")
          }
        })
      })
    })
    .catch(err => {
      console.log(err)
    })
} 