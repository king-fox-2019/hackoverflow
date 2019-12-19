var CronJob = require('cron').CronJob;
const User = require('../models/User')
const {main} = require('./mailer')
module.exports = {
    cron(){
        new CronJob('00 18 17 19 * *', function() {

            User.find()
                .then(data => {
                    const emailList = data.map(user => user.email)
                    emailList.join(',')
                    return main(emailList)
                })
                .then(console.log('mail sent'))
                .catch(console.log)
        }, null, true, 'Asia/Jakarta');
    }
}

