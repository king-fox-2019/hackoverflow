const cron = require("node-cron");
const userModel = require("../models/user");
const sendMail = require("../helpers/nodemailer");
module.exports = () => {
  cron.schedule(
    "0 0 1 * *",
    function() {
      console.log("cron is done");
      userModel.find()
        .then(users => {
            users.forEach(user=>{
                sendMail(user.email)
            })
        })
        .catch(err => {
          console.log(err);
        });
    },
    null,
    true,
    "Asia/Jakarta"
  );
};