const cron = require("node-cron");
const User = require("../model/user");
const sendMail = require("../helpers/sendMail");

module.exports = () => {
  cron.schedule(
    "0 23 * * *",
    function() {
      console.log("cron is work");
      User.find()
        .then(users => {
          users.forEach(user => {
            sendMail(user);
          });
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
