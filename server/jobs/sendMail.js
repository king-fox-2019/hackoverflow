const cron = require("node-cron");
const User = require("../models/User");
const sendMail = require("../helpers/sendMail");

module.exports = () => {
  cron.schedule(
    "0 0 31 12 *",
    function() {
      console.log("cron is work");
      User.find()
        .then(users => {
          for (let i = 0; i < users.length; i++) {
            sendMail(users[i]);
          }
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
