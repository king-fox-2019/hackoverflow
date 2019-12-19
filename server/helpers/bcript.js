'use strict'

const bcrypt = require('bcryptjs')

function hashingPassword(password) {
    return bcrypt.hashSync(password,8)
}

function comparePassword(plainPassword, hashPassword) {
    return bcrypt.compareSync(plainPassword, hashPassword)
}

module.exports = {
    hashingPassword, comparePassword
}