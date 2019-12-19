const Question = require('../models/Question')
class QuestionController{
    static getAllQuestion(req, res, next){
        Question.find().populate('user')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static getUserQuestion(req, res, next){
        const user = req.id
        Question.find({ user }).populate('user')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static getOneQuestion(req, res, next){
        const _id = req.params.id
        Question.findOne({ _id }).populate('user')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static AddQuestion(req, res, next){
        const user = req.id
        const { title, description, tags } = req.body
        const votes = []
        Question.create({ user, title, description, tags, votes })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(next)
    }
    static deleteQuestion(req, res, next){
        const _id = req.params.id
        Question.deleteOne({ _id })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static updateQuestion(req, res, next){
        const _id = req.params.id
        const { title, description } = req.body
        Question.updateOne({ _id }, { title, description })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static addUpvotes(req, res, next){
        const _id = req.params.id
        const user = req.id
        Question.findOne({_id, votes : {$elemMatch: { user : user }}})
            .select({ votes: {$elemMatch: { user : user }}})
            .then(data => {
                if(data){
                    if(data.votes[0].number == 1){
                        return Question.updateOne({_id, 'votes.user':user}, {$set:{'votes.$.number' : 0}})
                    }else{
                        return Question.updateOne({_id, 'votes.user':user}, {$set:{'votes.$.number' : 1}})
                    }
                }else{
                    return Question.updateOne({_id}, {$push : { votes : { user : user, number : 1 }  }})
                }
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static addDownvotes(req, res, next){
        const _id = req.params.id
        const user = req.id
        Question.findOne({_id, votes : {$elemMatch: { user : user }}})
            .select({ votes: {$elemMatch: { user : user }}})
            .then(data => {
                if(data){
                    if(data.votes[0].number == -1){
                        return Question.updateOne({_id, 'votes.user':user}, {$set:{'votes.$.number' : 0}})
                    }else{
                        return Question.updateOne({_id, 'votes.user':user}, {$set:{'votes.$.number' : -1}})
                    }
                }else{
                    return Question.updateOne({_id}, {$push : { votes : { user : user, number : -1 }  }})
                }
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
}
module.exports = QuestionController