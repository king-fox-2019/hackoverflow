const User = require('../models/user')
const { genToken } = require('../helpers/jwt')
const { dehash } = require('../helpers/bcrypt')

class Controller {
    static register(req, res, next) {
        // console.log(req.body);
        User.findOne({ email: req.body.email })
            .then((user) => {
                for (const key in req.body) if (!req.body[key]) req.body[key] = undefined
                // console.log(user, req.body);
                let dataHandle = {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    image: req.body.image,
                    aboutMe: req.body.aboutMe
                }
                if (user) {
                    next({ status: 400, msg: "Email has used" })
                }
                else {
                    return User.create(dataHandle)
                        .then((user) => {
                            console.log(user);
                            let userDataSent = {
                                id: user.id,
                                username: user.username,
                                answer: user.answer,
                                profilePicture: user.profilePicture
                            }
                            let token = genToken(userDataSent)
                            res.status(201).json({userDataSent, token})
                        })
                }
            })
            .catch(next);
    }

    static login(req, res, next) {
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (!user) { next({ status: 404, msg: 'User not found' }) }
                else {
                    let check = dehash(req.body.password, user.password)
                    if (check) {
                        let userDataSent = {
                            id: user._id,
                            username: user.username,
                            answer: user.answer,
                            profilePicture: user.profilePicture
                        }
                        let token = genToken(userDataSent)
                        res.status(200).json({userDataSent, token})
                    } else {
                        next({ status: 401, msg: 'Password Incorrect' })
                    }
                }
            })
            .catch(next);
    }

    static updating(req, res, next) {
        User.findByIdAndUpdate(req.decode.id, {
            aboutMe: req.body.aboutMe
        }, { new: true })
            .then((user) => {
                res.status(200).json(user)
            })
            .catch(next);
    }

    static getAllUser(req, res, next) {
        User.find()
            .then((result) => {
                res.status(200).json(result)
            }).catch(next);
    }

}

module.exports = Controller