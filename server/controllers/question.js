const Question = require('../model/question')

class QuestionController {
    static createQuestion(req,res,next){
        const { title, desc, tags } = req.body
        Question.create({
            title,
            desc,
            tags,
            author: req.decoded.id
        })
        .then(question => {
            res.status(200).json(question)
        })
        .catch(next)
    }

    static getOneQuestion(req,res,next){
        const { id } = req.params
        Question.findOne({
            _id: id
        })
        .then(question => {
            res.status(200).json(question)
        })
        .catch(next)
    }

    static getAllQuestion(req,res,next){
        Question.find()
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(next)
    }

    static editQuestion(req,res,next){
        let input = req.body
        let data = {}
        for(let index in input){
            data[index] = input[index]
        }
        Question.findOneAndUpdate({
            _id: req.params.id
        },
        data,
        {
            new: true
        })
        .then(question => {
            res.status(200).json(question)
        })
        .catch(next)
    }

    static upvote(req,res,next){
        Question.findOne({
            _id: req.params.id
        })
        .then(question => {
            let upvote = question.upvote
            if(upvote.include(req.decoded.id)){
                return Question.findOneAndUpdate({
                    _id: req.params.id
                },
                {
                    $pull: { upvote : req.decoded.id }
                },
                {
                    new: true
                })
            }else{
                return Question.findOneAndUpdate({
                    _id: req.params.id
                },
                {
                    $push: { upvote : req.decoded.id }
                },
                {
                    new: true
                })
            }
        })
        .then(question => {
            res.status(200).json(question)
        })
        .catch(next)
    }

    static downvote(req,res,next){
        Question.findOne({
            _id: req.params.id
        })
        .then(question => {
            let downvote = question.downvote
            if(downvote.include(req.decoded.id)){
                return  Question.findOneAndUpdate({
                    _id: req.params.id
                },
                {
                    $pull : { downvote : req.decoded.id }
                },
                {
                    new: true
                })
            }else{
                return Question.findOneAndUpdate({
                    _id: req.params.id
                },
                {
                    $push : { downvote : req.decoded.id }
                },
                {
                    new: true
                })
            }
        })
        .then(question => {
            res.status(200).json(question)
        })
        .catch(next)
    }

    static countView(req,res,next){
        Question.findOne({
            _id: req.params.id
        })
        .then(question => {
            let views = question.views
            if(views.include(req.decoded.id)){
                res.status(200).json(question)
            }else{
                return Question.findOneAndUpdate({
                    _id: req.decoded.id
                },
                {
                    $push : {
                        views: req.decoded.id
                    }
                },
                {
                    new: true
                })
            }
        })
        .then(question => {
            res.status(200).json(question)
        })
        .catch(next)
    }

    static deleteQuestion(req,res,next){
        Question.deleteOne({
            _id: req.params.id
        })
        .then(question => {
            res.status(200).json(question)
        })
        .catch(next)
    }
}

module.exports = QuestionController