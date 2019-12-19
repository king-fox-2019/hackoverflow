var bcrypt = require('bcryptjs');
module.exports = {
    encrypt(password){
        return bcrypt.hashSync(password, 8);
    },
    compare(inputPassword, hashPassword){
        return bcrypt.compareSync(inputPassword, hashPassword);
    }
}