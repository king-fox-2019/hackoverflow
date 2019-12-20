const nodemailer = require('nodemailer');

function sendEmail(user){
    const email = user.email;
    const username = user.username;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: `${process.env.GMAIL_ACCOUNT}`,
               pass: `${process.env.GMAIL_PASSWORD}`
           }
       });
    
       const mailOptions = {
        from: `${process.env.GMAIL_ACCOUNT}`,
        to: `${email}`,
        subject: 'Registration at Danang Mini-WordPress',
        html: `
        <h1>Thanks for become our member</h1>
        <p>This is your account information</p>
        <p>username : ${username}</p>
        <p>email : ${email}</p>
        <p>Lets make some post on our website !</p>
        `
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
}

module.exports = sendEmail;