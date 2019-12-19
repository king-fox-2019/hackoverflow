
const axios = require('axios')
var CronJob = require('cron').CronJob;

new CronJob('* * * * *', function() {

   axios({
       method : "post",
       url: "http://localhost:3000/questions/topthree",
   })
   .then(({data}) => {
       console.log(data)
   })
   .catch(err => {
       console.log(err)
   })
  console.log('Data will be updated');
}, null, true, 'Asia/Singapore');