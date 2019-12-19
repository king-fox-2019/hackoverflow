const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

module.exports = {
    genereteToken(payload){
        return jwt.sign(payload, secret)
    },
    verifyToken(token){
        return jwt.verify(token, secret)
    }
}