const jwt = require('jsonwebtoken')
const User = require('../models/user')

function authentication(req,res,next){
    if(req.headers.token){
        let decoded = jwt.verify(req.headers.token,'secret')
        req.decoded = decoded
        User.findById(decoded.id)
        .then(user=>{
            if(user) next()
            else next({name:401,message:'You are not authenticated'})
        })
        .catch(next)
    }else{next({name:401,message:'You are not authenticated'})}
}

module.exports = authentication