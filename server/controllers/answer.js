const Answer = require('../models/Answer')
class AnswerController{
    static getQuestionAnswer(req, res, next){
        const question = req.params.id
        Answer.find({ question }).populate('user').populate('comment.user')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static addAnswer(req, res, next){
        const user = req.id
        const { question, description, } = req.body
        const votes = []
        ,comment = []
        Answer.create({ user, question, description, votes, comment })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(next)
    }
    static commentToAnswer(req, res, next){
        const _id = req.params.id
        const comment = {
            user : req.id,
            comment : req.body.comment
        }
        Answer.updateOne({ _id }, {$push : { comment }})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static deleteAnswer(req, res, next){
        const _id = req.params.id
        Answer.deleteOne({ _id })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static updateAnswer(req, res, next){
        const _id = req.params.id
        const { description, } = req.body
        Answer.updateOne({ _id },{ description })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static addUpvotes(req, res, next){
        const _id = req.params.id
        const user = req.id
        Answer.findOne({_id, votes : {$elemMatch: { user : user }}})
            .select({ votes: {$elemMatch: { user : user }}})
            .then(data => {
                if(data){
                    if(data.votes[0].number == 1){
                        return Answer.updateOne({_id, 'votes.user':user}, {$set:{'votes.$.number' : 0}})
                    }else{
                        return Answer.updateOne({_id, 'votes.user':user}, {$set:{'votes.$.number' : 1}})
                    }
                }else{
                    return Answer.updateOne({_id}, {$push : { votes : { user : user, number : 1 }  }})
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
        Answer.findOne({_id, votes : {$elemMatch: { user : user }}})
            .select({ votes: {$elemMatch: { user : user }}})
            .then(data => {
                if(data){
                    if(data.votes[0].number == -1){
                        return Answer.updateOne({_id, 'votes.user':user}, {$set:{'votes.$.number' : 0}})
                    }else{
                        return Answer.updateOne({_id, 'votes.user':user}, {$set:{'votes.$.number' : -1}})
                    }
                }else{
                    return Answer.updateOne({_id}, {$push : { votes : { user : user, number : -1 }  }})
                }
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
}
module.exports = AnswerController