const verifyToken = require('../helpers/tokenGenerator').verifyToken
const User = require('../models/user')

module.exports = {
  authentication: function(req, res, next) {
    try {
      const decodeToken = verifyToken(req.headers.token)
      User.findOne({ email: decodeToken.email })
      .then(user => {
        
          if(user) {
            req.loggedUser = user
            
            next()
          } else {
            next({ status: 403, message: 'user not found, authentication failed' })
          }
        })
        .catch(next)
    } catch(err) {
      next({ status: 403, message: err })
    }
  }
}