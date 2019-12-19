const User = require('../models/User')
const verifyToken = require('../helpers/verifyToken')

module.exports = (req, res, next) => {
  try {
    const { access_token } = req.headers
    const decoded = verifyToken(access_token, next)

    if (!decoded) {
      throw {
        name: 'Unauthorized',
        status: 401,
        message: 'Unauthorized access! Please sign in/join first.'
      }
    }
    const { payload } = decoded

    User
      .findOne({ email: payload.email })
      .then(user => {
        if (!user) {
          throw {
            name: 'Unauthorized',
            status: 401,
            message: 'Unauthorized access! Please sign in/join first.'
          }
        }
        req.user = { id: user._id, email: payload.email }

        next()
      })
      .catch(next)
  }
  catch (err) { next(err) }
}