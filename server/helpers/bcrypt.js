const bcrypt = require('bcryptjs')
const salt = bcrypt.genSalt(10)

module.exports = {
    hash(password){
        return bcrypt.hashSync(password, salt)
    },
    compare(password, hashedPassword){
        return bcrypt.compareSync(password, hashedPassword)
    }
}