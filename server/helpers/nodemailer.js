const nodemailer = require('nodemailer');

module.exports = function(email, resetToken) {
    return new Promise((resolve, reject) => {
        let transport = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
               user: process.env.MAIL_TRAP_USERNAME,
               pass: process.env.MAIL_TRAP_PASSWORD
            }
        });
    
        const message = {
            from: 'angela@mail.com',
            to: email,
            subject: 'Password Reset',
            text: `Hello, we sent you a password reset link. 
                ${process.env.CLIENT_URL}/reset/${resetToken}
                Please reset your password by clicking the link and entering your new password.
                Cheers!`
        };
    
        transport.sendMail(message, function(err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        });
      });
}