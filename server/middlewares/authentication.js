const { verifyToken } = require('../helpers/token')

module.exports = {
  authentication(req, res, next) {
    try {
      let token = req.headers.token
      let decoded = verifyToken(token)
      req.decoded = decoded
      next()
    } catch (error) {
      next({status: 400, message: 'Login first!'})
    }
  }
}
