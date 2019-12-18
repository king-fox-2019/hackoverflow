const kue = require('kue');
const queue = kue.createQueue();
const emailSender = require('../helpers/nodemailer');

module.exports = {
    createJob: function(obj) {
        const job = queue
            .create('email', obj)  
            .save(function(err) {
                if (err) {
                    console.log(err)
                } 
            })
            .on('complete', function(data) {
                console.log(data)
            })
            .on('failed', function (err){
                console.log(err)
            })
    },
    processJob: function() {
        queue.process('email', 1, (job, done) => {
            emailSender(job.data.email, job.data.resetToken)
                .then((success) => { 
                    done();
                })
                .catch((err) => {
                    console.log(err)
                });
        });
    }
}