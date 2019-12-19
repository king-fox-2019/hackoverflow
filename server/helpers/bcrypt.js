const bcrypt = require('bcryptjs')

class Bcrypt {
  static hash(password){
    return bcrypt.hashSync(password, 10);
  }
  static compare(password, hashPassword){
    return bcrypt.compareSync(password, hashPassword);
  }
}

module.exports = Bcrypt