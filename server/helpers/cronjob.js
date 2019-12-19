// const cron = require('node-cron');
// const Question = require('../models/question');
// const kue = require('kue');
// const nodemailer = require('./nodemailer');

// const queue = kue.createQueue({
// 	redis: {
// 		host: 'redis',
// 		port: 6379
// 	}
// });

// module.exports = function schedule() {
//   cron.schedule('00 09 * * sat', () => { // 00 09 * * sat
//     console.log('cron schedule invoked');

//     Question.find({})
//       .populate('userId')
//       .then(questions => {
//         questions.forEach(q => {
//           let template = `
//                         Hi, ${q.userId.email.split('@')[0]}
//                         Your question "${q.title}" has been upvoted for ${q.upVotes.length} time(s) and downvoted for ${q.downVotes.length} time(s).
//                         Your question reputation is : ${q.upVotes.length} -  ${q.downVotes.length} POINTS.

//                         <img src="http://imgur.com/rXYLuXh">
//                         - Hacktiv-Overflow
//                         `
//           let email = q.userId.email

//           queue
//           .create('email', {email, template})
//           .save()
//         })
//       })
//       .catch(err => {
//         console.log(err, 'error dari kue');
        
//       })
//       queue.process('email', function (job, done) {
//           nodemailer(job.data.email, job.data.template)
//           done()
//     })
//   })
// }

