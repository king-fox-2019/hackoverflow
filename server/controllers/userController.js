'use strict'

const user = require('../models/user')
const bcrypt = require('../helpers/bcript')
const jwt = require('../helpers/jwt')

class userController {

    static getAllUser(req, res, next) {
        user.find().select('-password -_id ')
            .then(users => {
                res.status(200).json({
                    code: 200,
                    status: 'Success',
                    users
                })
            })
            .catch(next)
    }

    static register(req, res, next) {
        const registerData = {
            displayName: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        user.create(registerData)
            .then(user => {
                res.status(201).json({
                    code: 201,
                    status: "Success",
                    message: "Register Successful !",
                    user: {
                        _id: user.id,
                        displayName: user.displayName,
                        email: user.email,
                        registredTime: user.created_at
                    }
                })
            })
            .catch(next)
    }

    static login(req, res, next) {
        user.findOne({
            email: req.body.email
        })
            .then(user => {
                if (!user) {
                    next({ name: 'LoginError', code: 400, message: 'wrong email & password combination!' })
                }
                else {
                    if (bcrypt.comparePassword(req.body.password,user.password)) {
                        const payload = {
                            name: user.name,
                            email: user.email,
                            userId: user.id
                        }
                        const token = jwt.generateToken(payload)
                        res.status(200).json({
                            code: 200,
                            status: 'success',
                            access_token: token
                        })
                    }
                    else {
                        next({ name: 'LoginError', code: 400, message: 'wrong email & password combination!' })
                    }
                }
            })
    }

}

module.exports = userController