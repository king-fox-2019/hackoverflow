const jwt = require('jsonwebtoken')
if(process.env.NODE_ENV == 'development'){
    require('dotenv').config()
}
function sign(payload){
    return jwt.sign(payload, process.env.SECRET, {expiresIn:'1d'})
}
function verify(payload){
    return jwt.verify(payload, process.env.SECRET)
}

module.exports = {
    sign, verify
}