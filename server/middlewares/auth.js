const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Question = require('../models/question');
const Answer = require('../models/answer');

module.exports = {
    authentication : function (req, res, next) {
        console.log('authentication')
        console.log('req.headers.token => ',req.headers.token);
        if (req.headers.token) {
            console.log('ada token');
            
            try {
                const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
                req.authenticatedUser = decoded
                next()
            } catch (e) {
                res.status(401).json({
                    message : ' Invalid token'
                })
            }
        } else {
            console.log('token undefined')
            res.status(401).json({
                message : ' You are not logged in'
            })
        }
    },
    authorizationQuestion: function (req, res, next) {
        console.log(req.params, 'ISI REQ');
        
        Question.findOne({_id : req.params.questionId})
          .then(data => {
            if (data.userId.toString() == req.authenticatedUser.id.toString()) {
              next()
            } else {
              
              res.status(401).json({
                errors: {
                  message: 'You dont have access for modify this question'
                }
              })
            }
          })
          .catch(err => {
            res.status(400).json(err)
          })
      },
      authorizationAnswer: function (req, res, next) {
        console.log('authorizationAnswer');
        console.log('req.body => ',req.body);
        
        Answer.findOne({_id : req.params.answerId})
          .then(data => {
            if (data.userId.toString() == req.authenticatedUser.id.toString()) {
              next()
            } else {
              
              res.status(401).json({
                errors: {
                  message: 'You dont have access for modify this answer'
                }
              })
            }
          })
          .catch(err => {
            res.status(400).json(err)
          })
      },
      authorizationQuestion: function (req, res, next) {
        console.log(req.params, 'ISI REQ');
        
        Question.findOne({_id : req.params.questionId})
          .then(data => {
            if (data.userId.toString() == req.authenticatedUser.id.toString()) {
              next()
            } else {
              
              res.status(401).json({
                errors: {
                  message: 'You dont have access for modify this question'
                }
              })
            }
          })
          .catch(err => {
            res.status(400).json(err)
          })
      }
}