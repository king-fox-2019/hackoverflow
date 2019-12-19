const { verifyToken } = require('../helpers/jwt')
const UserModel = require('../models/user')
const QuestionModel = require('../models/question')
const AnswerModel = require('../models/answer')
function authentication(req, res, next){
    try {
        let decodedToken = verifyToken(req.headers.token)
        UserModel.findOne({ _id : decodedToken.id })
            .then(user => {
                console.log(user);
                if(user){
                    req.loggedUser = decodedToken
                    next()
                }
                else{
                    next({
                        status: 401,
                        message: 'Authentication Failed'
                    })
                }
            })
            .catch(next)
    }
    catch(err) {
        next({ 
            status: 401,
            message: err 
        })
    }
}
function authorizationQuestion(req, res, next){
    QuestionModel.findOne({ _id : req.params.id })
        .then(result => {
            if(!result){
                next({ status: 404, message: 'Not Found' })
            }
            else if(result.userId == req.loggedUser.id){
                next()
            }
            else{
                next({ 
                    status: 403, 
                    message: 'Not Authorized' 
                })
            }
        })
        .catch(next)
}
function authorizationAnswer(req, res, next){
    AnswerModel.findOne({ _id : req.params.id })
        .then(result => {
            if(!result){
                next({ status: 404, message: 'Not Found' })
            }
            else if(result.userId == req.loggedUser.id){
                next()
            }
            else{
                next({ 
                    status: 403, 
                    message: 'Not Authorized' 
                })
            }
        })
        .catch(next)
}
module.exports = { authentication, authorizationQuestion, authorizationAnswer }