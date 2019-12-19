'use strict'

const jwt = require('jsonwebtoken')


function generateToken(payload) {
    return jwt.sign(payload, 'haCkT!v0VerFlow')
}

function getPayload(token) {
    return jwt.verify(token, 'haCkT!v0VerFlow')
}

module.exports = {
    generateToken, getPayload
}