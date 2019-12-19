const { verifyToken } = require('../helpers/jwt')
const User = require('../models/User')
const Thread = require('../models/Thread')
const Reply = require('../models/Reply')

module.exports = {
  authenticate(req, res, next) {
    try {
      let {id} = verifyToken(req.headers.token)
      User.findById(id)
        .then(user => {
          if (user) {
            req.decodedId = id
            next()
          }
          else next({
            status: 401,
            message: 'Authentication failed!'
          })
        })
    } catch (error) {
      next(error)
    }
  },
  authorizeThread(req, res, next) {
    try {
      let id = req.params.id
      Thread.findById(id)
        .then(thread => {
          if (thread) {
            console.log(thread.author, req.decodedId, 'ini dia')
            if (thread.author.equals(req.decodedId)) {
              next()
            }
            else next({
              status: 403,
              message: 'You are not authorized!'
            })
          } else {
            next({
              status:400, 
              message:'Thread not found!'
            })
          }
        })
        .catch(next)
    } catch (error) {
      next(error)
    }
  },
  authorizeReply(req, res, next) {
    try {
      let id = req.params.id
      Reply.findById(id)
        .then(reply => {
          if (reply) {
            console.log(reply.author, req.decodedId, 'ini dia')
            if (reply.author.equals(req.decodedId)) {
              next()
            }
            else next({
              status: 403,
              message: 'You are not authorized!'
            })
          } else {
            next({
              status:400, 
              message:'Thread not found!'
            })
          }
        })
        .catch(next)
    } catch (error) {
      next(error)
    }
  }
}