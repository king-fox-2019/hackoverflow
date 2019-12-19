const UserModel = require('../models/user')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

module.exports = {
    register(req, res, next) {
        const { email, password, image } = req.body
        UserModel.create({ email, password, image })
            .then(user => {
                let payload = { id : user._id }
                let token = generateToken(payload)
                res.status(201).json({ message : `create user successfuly` , token, user })
            })
            .catch(next)
    },
    login(req, res, next) {
        const { email, password } = req.body
        UserModel.findOne({ email })
            .then(user => {
                if (user) {
                    if (comparePassword(password, user.password)) {
                        let payload = { id : user._id }
                        let token = generateToken(payload)
                        res.status(200).json({ token, user })
                    } else {
                        next({ status: 400, message: 'Email or Password Wrong!' })
                    }
                } else {
                    next({ status: 404, message: 'Email is Wrong!' })
                }
            })
            .catch(next)
    },
    findOne(req,res,next){
        UserModel.findOne({ _id : req.loggedUser.id })
            .then(user=>{{
                res.status(200).json(user)
            }})
            .catch(next)
    },
    findAll(req, res, next) {
        UserModel.find()
            .then(user => {
                res.status(200).json(user)
            })
            .catch(next)
    },
    delete(req, res, next) {
        UserModel.findOneAndDelete({
            _id : req.params.id
        })
        .then(user => {
            res.status(200).json({ user, message : 'Delete Success' })
        })
        .catch(next)
    },
    updateWatchedTags(req,res,next){
        const { tag, condition } = req.body
        UserModel.findOne({ _id : req.loggedUser.id })
            .then(user=>{
                let flag = false
                if (condition) { flag = false }
                else if(!condition) {
                    if (user.watchedTags.length > 0) {
                        user.watchedTags.forEach(tagwatch=>{
                            if (tag[tag.length-1] == tagwatch) {
                                flag = true
                                next({
                                    status: 400,
                                    message: `canot be dublicated, watched tags`
                                })
                            }
                        })
                    }
                }
                if (!flag) {
                    return UserModel.findOneAndUpdate({ _id : req.loggedUser.id },{ watchedTags : tag },{ new:true, runValidators:true })
                }
            })
            .then(user=>{{
                res.status(200).json(user)
            }})
            .catch(next)
    }
}