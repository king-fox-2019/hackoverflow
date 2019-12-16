const User = require('../model/user')
const Question = require('../model/question')
const { verifyToken } = require('../helpers/jwt')

module.exports = {
    authenticate(req,res,next){
        try{    
            let decoded = verifyToken(req.headers.access_token)
            req.decoded = decoded
            next()
        }catch(err){
            next(err)
        }
    },
    authorizationQuestion(req,res,next){
        Question.findOne({
            _id: req.params.id
        })
        .then(question => {
            if(question.author == req.decoded.id){
                next()
            }else{
                throw({
                    status: 403,
                    message: 'You dont have permission to do that'
                })
            }
        })
        .catch(next)
    }
}