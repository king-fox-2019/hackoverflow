const User = require('../models/User')
const { sign } = require('../helpers/token')
const { compare } = require('../helpers/encrypt')
class UserController{
    static register(req, res, next){
        const { email, username, password } = req.body
        const watchedTag = []
        User.create({ email, username, password, watchedTag })
            .then(data => {
                const access_token = sign({id:data._id})
                res.status(201).json({access_token, username : data.username})
            })
            .catch(next)
    }
    static login(req,res,next){
        const { email, password } = req.body
        User.findOne({ email })
            .then(data => {
                if(data && compare(password, data.password)){
                    const access_token = sign({id:data._id})
                    res.status(201).json({access_token, username : data.username})
                }else{
                    next({code:400, message : 'wrong email or password'})
                }
            })
            .catch(next)
    }
    static fetchTag(req, res, next){
        const _id = req.id
        User.findOne({_id})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static addTag(req, res, next){
        console.log('uy')
        const _id = req.id
        User.updateOne({_id}, {$push : { watchedTag :  req.body.tag  }})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
}
module.exports = UserController