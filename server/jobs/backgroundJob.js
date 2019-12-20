require('dotenv').config()
const cron = require('node-cron')
const User = require('../models/user')
const sendEmail = require('../helpers/sendEmail')
const mongoose = require('mongoose')
const mongoUri = process.env.MONGO_URI

mongoose.connect(mongoUri, {
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function(err){
    if(err) console.log(err)
    else console.log(`Sucess to connect database`)
})

cron.schedule('0 0 0 1 * *', function() {
    User.find()
        .then(users => {
            console.log('jalan dong cron nya')
            for(let i = 0; i < users.length; i++){
                sendEmail(users[i])
            }
        })
        .catch(err => {
            console.log(err)
        })
}, null, true, 'Asia/Jakarta');