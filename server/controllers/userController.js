const User = require('../models/user')
const jwt = require('jsonwebtoken')

class userController{
    static register(req,res,next){
        User.create({
            name:req.body.name,
            password:req.body.password,
            email:req.body.email
        })
        .then(user=>{
            let token = jwt.sign({id:user._id},'secret')
            res.status(201).json({name:user.name,token})
        })
        .catch(next)
    }
    static login(req,res,next){
        User.findOne({email:req.body.email})
        .then(user=>{
            if(user){
                if(user.password===req.body.password){
                    let token = jwt.sign({id:user._id},'secret')
                    res.status(201).json({name:user.name,token,tags:user.watchedTags})
                }else{
                    throw {name:404,message:'user not found'}
                }
            }else throw {name:404,message:'user not found'}
        })
        .catch(next)
    }
    static addTag(req,res,next){
        User.updateOne({_id:req.decoded.id},{
            $push:{watchedTags:req.body.watchedTags}
        })
        .then(result=>{
            res.status(201).json(result)
        })
        .catch(next)
    }
    static getTag(req,res,next){
        User.findOne({_id:req.decoded.id})
        .then(user=>res.status(200).json(user))
        .catch(next)
    }
}

module.exports = userController