const QuestionModel = require('../models/question')
const AnswerModel = require('../models/answer')

module.exports = {
    created(req,res,next){
        const { title, description } = req.body
        const { id } = req.params
        AnswerModel.create({ description, userId: req.loggedUser.id })
            .then(question=>{
                return QuestionModel.findOneAndUpdate({ _id : id },{ $push : { answerId: question._id }  },{ new:true, runValidators: true })
            })
            .then(question=>{
                res.status(201).json({
                    message: `create answer success`,
                    question
                })
            })
            .catch(next)
    },
    findOne(req,res,next){
        const { id } = req.params
        AnswerModel.findOne({ _id : id })
            .populate('userId')
            .populate('answerId')
            .then(question=>{
                res.status(200).json(question)
            })
            .catch(next)
    },
    findAll(req, res, next) {
        AnswerModel.find({}).sort({ createdAt: -1 })
            .populate('userId')
            .populate('answerId')
            .then(question => {
                res.status(200).json(question)
            })
            .catch(next)
    },
    delete(req, res, next) {
        const { productId } = req.body
        AnswerModel.findOneAndDelete({
            _id : req.params.id
        })
        .then(question => {
            return QuestionModel.findOneAndUpdate({ _id: productId },{ $pull: { answerId: req.params.id }},{ new:true, runValidators: true})
        })
        .then(result=>{
            res.status(200).json({ result, message : 'Delete Success' })
        })
        .catch(next)
    },
    upvotes(req,res,next){
        let message;
        let flag = false
        AnswerModel.findOne({ downvotes: req.loggedUser.id })
            .then(vote=>{
                if (vote) {
                    flag = false
                    message = `berhasil menghapus vote`
                    return AnswerModel.findOneAndUpdate({ _id: req.params.id },{ $pull : { downvotes: req.loggedUser.id }},{ new: true, runValidators: true })
                } else {
                    flag = true
                    return AnswerModel.findOne({ upvotes: req.loggedUser.id })
                }
            })
            .then(result=>{
                if (!flag) {
                    res.status(200).json({
                        message,
                        result
                    })
                } else {
                    if (result) {
                        message = `berhasil menghapus vote`
                        return AnswerModel.findOneAndUpdate({ _id: req.params.id },{ $pull : { upvotes: req.loggedUser.id }},{ new: true, runValidators: true })
                    } else {
                        message = `berhasil menambahkan vote`
                        return AnswerModel.findOneAndUpdate({ _id: req.params.id },{ $push : { upvotes: req.loggedUser.id }},{ new: true, runValidators: true })
                    }
                }
            })
            .then(finalResult=>{
                res.status(200).json({
                    message,
                    finalResult
                })
            })
            .catch(next)
    },
    downvotes(req,res,next){
        let message;
        let flag = false
        AnswerModel.findOne({ upvotes: req.loggedUser.id })
            .then(vote=>{
                if (vote) {
                    flag = false
                    message = `berhasil menghapus vote`
                    return AnswerModel.findOneAndUpdate({ _id: req.params.id },{ $pull : { upvotes: req.loggedUser.id }},{ new: true, runValidators: true })
                } else {
                    flag = true
                    return AnswerModel.findOne({ downvotes: req.loggedUser.id })
                }
            })
            .then(result=>{
                if (!flag) {
                    res.status(200).json({
                        message,
                        result
                    })
                } else {
                    if (result) {
                        message = `berhasil menghapus vote`
                        return AnswerModel.findOneAndUpdate({ _id: req.params.id },{ $pull : { downvotes: req.loggedUser.id }},{ new: true, runValidators: true })
                    } else {
                        message = `berhasil menambahkan vote`
                        return AnswerModel.findOneAndUpdate({ _id: req.params.id },{ $push : { downvotes: req.loggedUser.id }},{ new: true, runValidators: true })
                    }
                }
            })
            .then(finalResult=>{
                res.status(200).json({
                    message,
                    finalResult
                })
            })
            .catch(next)
    }
}