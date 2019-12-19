const answer = require('../models/answer');
const question = require('../controller/question');

class controllerAnswer {
    static create(req, res, next) {
        answer.create({
            question: req.body.question,
            description: req.body.description,
            user: req._id
        }).then(response => {
            question.addAnswer(req.body.question, response._id);
            res.status(201).json({
                message: "Answer successfully created",
                data: response
            })
        }).catch(next)
    }

    static view(req, res, next) {
        answer.find({
            user: req._id
        }).populate(
            'user',  'name'
        ).then(response => {
            res.status(201).json({
                data: response
            })
        }).catch(next)
    }

    static delete(req, res, next) {
        answer.findByIdAndDelete(
            req.params.id
        ).then(response => {
            if (!response) throw({code: 400, errmsg: "Answer not found"});
            res.status(201).json({
                message: "Answer successfully deleted",
                data: response
            })
        }).catch(next)
    }
}

module.exports = controllerAnswer;