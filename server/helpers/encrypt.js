const bcrypt = require('bcryptjs')

module.exports = {
  hashPassword(password) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
  },

  comparePassword(password, hashedPw) {
    return bcrypt.compareSync(password, hashedPw)
  }
}
