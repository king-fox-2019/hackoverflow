const QuestionModel = require('../models/question')
const UserModel = require('../models/user')

module.exports = {
    watchTag(req,res,next){
        const { tag } = req.body
        QuestionModel.find({ tags : tag }).sort({ createdAt: -1 })
            .populate('userId')
            // .populate('answerId')
            .populate({ path: 'answerId', populate: { path: 'userId'} })
            .then(question=>{
                res.status(200).json(question)
            })
            .catch(next)
    },
    findSearch(req,res,next){
        const { search } = req.body
        QuestionModel.find({}).sort({ createdAt: -1 })
            .populate('userId')
            // .populate('answerId')
            .populate({ path: 'answerId', populate: { path: 'userId'} })
            .then(question=>{
                let temp = []
                question.forEach(ques=>{
                    if (ques.title.toLowerCase().includes(search.toLowerCase())) {
                        temp.push(ques)
                    }
                })
                question = temp
                res.status(200).json(question)
            })
            .catch(next)
    },
    updated(req,res,next){
        const { title, description, tags } = req.body
        const { id } = req.params
        QuestionModel.findOneAndUpdate({ _id: id },{ title, description, userId: req.loggedUser.id, tags },{ new: true, runValidators: true })
            .then(question=>{
                res.status(200).json({
                    message: `updated question success`,
                    question
                })
            })
            .catch(next)
    },
    created(req,res,next){
        const { title, description, tags } = req.body
        QuestionModel.create({ title, description, userId: req.loggedUser.id, tags })
            .then(question=>{
                res.status(201).json({
                    message: `create question success`,
                    question
                })
            })
            .catch(next)
    },
    findOne(req,res,next){
        const { id } = req.params
        QuestionModel.findOne({ _id : id })
            .populate('userId')
            .populate('answerId')
            .populate({ path: 'answerId', populate: { path: 'userId'} })
            .then(question=>{
                res.status(200).json(question)
            })
            .catch(next)
    },
    findAll(req, res, next) {
        QuestionModel.find({}).sort({ createdAt: -1 })
            .populate('userId')
            // .populate('answerId')
            .populate({ path: 'answerId', populate: { path: 'userId'} })
            .then(question => {
                res.status(200).json(question)
            })
            .catch(next)
    },
    delete(req, res, next) {
        QuestionModel.findOneAndDelete({
            _id : req.params.id
        })
        .then(question => {
            res.status(200).json({ question, message : 'Delete Success' })
        })
        .catch(next)
    },
    upvotes(req,res,next){
        let message;
        let flag = false
        QuestionModel.findOne({ downvotes: req.loggedUser.id })
            .then(vote=>{
                if (vote) {
                    flag = false
                    message = `berhasil menghapus vote`
                    return QuestionModel.findOneAndUpdate({ _id: req.params.id },{ $pull : { downvotes: req.loggedUser.id }},{ new: true, runValidators: true })
                } else {
                    flag = true
                    return QuestionModel.findOne({ upvotes: req.loggedUser.id })
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
                        return QuestionModel.findOneAndUpdate({ _id: req.params.id },{ $pull : { upvotes: req.loggedUser.id }},{ new: true, runValidators: true })
                    } else {
                        message = `berhasil menambahkan vote`
                        return QuestionModel.findOneAndUpdate({ _id: req.params.id },{ $push : { upvotes: req.loggedUser.id }},{ new: true, runValidators: true })
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
        QuestionModel.findOne({ upvotes: req.loggedUser.id })
            .then(vote=>{
                if (vote) {
                    flag = false
                    message = `berhasil menghapus vote`
                    return QuestionModel.findOneAndUpdate({ _id: req.params.id },{ $pull : { upvotes: req.loggedUser.id }},{ new: true, runValidators: true })
                } else {
                    flag = true
                    return QuestionModel.findOne({ downvotes: req.loggedUser.id })
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
                        return QuestionModel.findOneAndUpdate({ _id: req.params.id },{ $pull : { downvotes: req.loggedUser.id }},{ new: true, runValidators: true })
                    } else {
                        message = `berhasil menambahkan vote`
                        return QuestionModel.findOneAndUpdate({ _id: req.params.id },{ $push : { downvotes: req.loggedUser.id }},{ new: true, runValidators: true })
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