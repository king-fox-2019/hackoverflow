`use strict`

const { verifyToken } = require('../helpers/jwt')
const User = require('../models/user')
const Answer = require('../models/answer')
const Question = require('../models/question')


function authenticating(req, res, next) {
    console.log('masuk authen');
    try {
        console.log(req.headers.token)
        req.decode = verifyToken(req.headers.token)
        console.log(req.decode);
        User.findById(req.decode.id)
            .then((user) => {
                if (!user) {
                    throw ({
                        status: 404,
                        msg: 'User undefined/not registered'
                    })
                } else {
                    next()
                }
            })
            .catch(next);
    } catch (error) {
        next({ status: 401, msg: "Unathorized" })
    }
}

function authorizating(req, res, next) {
    console.log(req.baseUrl);
    let Model = ''
    if (req.baseUrl.includes('questions')) {Model = Question}
    else if (req.baseUrl.includes('answers')) {Model = Answer}
    else if (req.baseUrl.includes('users')) {Model = User}
    Model.findById(req.params.id)
        .then((model) => {
            console.log(req.params, 'auya');
            if (!model) {
                next({ status: 404, msg: `${Model} not found` })
            } else if (model.asker != req.decode.id) {
                next({ status: 403, msg: `This ${Model} not belongs to you, sir!!` })
            } else {
                next()
            }
        })
        .catch(next);
    // next({ status: 500, msg: "Something went wrong" })
}


module.exports = {
    authenticating,
    authorizating
}