const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

function genToken(payload) {
    return jwt.sign(payload, jwtSecret)
}

function verifyToken(token) {
    return jwt.verify(token, jwtSecret)
}

module.exports = {
    genToken,
    verifyToken
}