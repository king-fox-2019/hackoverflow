const jwt = require('jsonwebtoken')

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET_HACKTIFLOW)
}

module.exports = verifyToken