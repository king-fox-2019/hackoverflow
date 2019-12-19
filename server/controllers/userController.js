const User = require('../models/user')
const generateToken = require('../helpers/TokenGenerator').generateToken
const { verifyToken } = require('../helpers/TokenGenerator')
const verifyPassword =  require('../helpers/PasswordGenerator').verifyPassword

class UserController {

    static findAllUser(req,res,next){
        User.find()
            .then(users => {
                res.status(200).json(users)
            })
            .catch(err => {
                next(err)
            })
    }

    static addUserTag(req,res,next){
        const decodeToken = verifyToken(req.headers.token)
        User.findOneAndUpdate({ email: decodeToken.email }, { $addToSet : {tags : req.body.tag}},{new : true})
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                next(err)
            })
    }

    static getUserInfo(req,res,next){
        const decodeToken = verifyToken(req.headers.token)
        User.findOne({ email: decodeToken.email })
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                next(err)
            })
    }
    
    static register(req,res,next){
        User.create({
            name: req.body.name,
            email : req.body.email,
            password: req.body.password,
            profilePicture : req.body.file,
            profile : req.body.profile
        })
        .then(user => {
            const payload = {
                _id : user._id,
                name : user.name,
                email : user.email,
            }
            const token = generateToken(payload)
            res.status(200).json({message:'register success',token : token})
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static login(req,res,next){
        const {email,password} = req.body
        if(!email || !password){
            res.status(400).json({message : 'bad request'})
        }else{
            const invalidSigninError = {
                status : 404,
                message : 'invalid email/password'
            }
        User.findOne({
            email : email
        })
        .then(user => {
            if(user){
                if(verifyPassword(password,user.password)){
                    const payload = {
                        _id : user._id,
                        name : user.name, 
                        email : user.email,
                    }
                    const token = generateToken(payload)
                    res.status(200).json({message:'login success',token : token})
                }else{
                    next(invalidSigninError)
                }
            }else{
                next(invalidSigninError)
            }
        })
        .catch(next)
        }
    }
}

module.exports = UserController