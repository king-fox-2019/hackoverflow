const User = require('../model/user')
const avatar = "https://api.adorable.io/avatars/285"
const { compare } = require('../helpers/bcrypt')
const { genereteToken } = require('../helpers/jwt')

class UserController {

    static register(req,res,next){
        console.log(req.body)
        const { username, email, password } = req.body
        User.create({
            username,
            email,
            password,
            avatar: `${avatar}/${email}.png`
        })
        .then(user => {
            res.status(201).json(user)
        })
        .catch(next)
    }   

    static login(req,res,next){
        const { email,password } = req.body
        User.findOne({
            email
        })
        .then(user => {
            if(user){
                let valid = compare(password, user.password)
                if(valid){
                    let token = genereteToken({id: user._id})
                    res.status(200).json({
                        user,
                        token
                    })
                }else{
                    throw({
                        status: 400,
                        message: 'Your password is wrong'
                    })
                }
            }else{
                throw({
                    status: 400,
                    message: 'Your email is not registered'
                })
            }
        })
        .catch(next)
    }

    static getInfo(req,res,next){
        User.findOne({
            _id: req.decoded.id
        })
        .then(user => {
            res.status(200).json(user)
        })
        .catch(next)
    }

    static getAllUser(req,res,next){
        User.find()
            .then(users=>{
                res.status(200).json(users)
            })
            .catch(next)
    }

}

module.exports = UserController