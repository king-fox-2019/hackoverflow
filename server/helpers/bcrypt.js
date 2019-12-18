const bcrypt = require('bcryptjs')

function hash(password) {
    return bcrypt.hashSync(password, 6)
}

function dehash(password, db_pass) {
    return bcrypt.compareSync(password, db_pass)
}

module.exports = {
    hash,
    dehash
}