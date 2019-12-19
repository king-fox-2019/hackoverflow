'use strict'

const jwt = require('../helpers/jwt')
const modelUser = require('../models/user')

function authenticating(req, res, next) {
    const token = req.headers.authorization || 'tokenkosong'
    req.userData = jwt.getPayload(token)
    // console.log(payload)
    modelUser.findOne({
        email: req.userData.email
    })
        .then(user => {
            if (!user) {
                next({ name: 'AuthenticatingError', code: 401, message: 'Invalid Access Token' })
            }
            else {
                next()
            }
        })
        .catch(next)
}

module.exports = {
    authenticating
}