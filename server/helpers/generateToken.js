const jwt = require('jsonwebtoken')

function generateToken(payload) {
  return jwt.sign({ payload }, process.env.JWT_SECRET_HACKTIFLOW)
}

module.exports = generateToken