const question = require('../models/question');

class controllerQuestion {
    static create(req, res, next) {
        question.create({
            title: req.body.title,
            description: req.body.description,
            user: req._id
        }).then(response => {
            res.status(201).json({
                message: "Question successfully created",
                data: response
            })
        }).catch(next)
    }

    static view(req, res, next) {
        question.find()
            .then(response => {
                res.status(201).json({
                    data: response
                })
            }).catch(next)
    }

    static viewOne(req, res, next) {
        question.findById(
            req.params.id
        ).populate(
            'answer'
        ).populate(
            'user', 'name'
        ).then(response => {
            res.status(201).json({
                data: response
            })
        }).catch(next)
    }

    static addAnswer(questionID, answerID) {
        question.findByIdAndUpdate(
            questionID,
            {"$push": {
                    answer: answerID
                }
            }).then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
    }

    static delete(req, res, next) {
        question.findByIdAndDelete(
            req.params.id
        ).then(response => {
            if (!response) throw({code: 400, errmsg: "Question not found"});
            res.status(201).json({
                message: "Question successfully deleted",
                data: response
            })
        }).catch(next)
    }
}

module.exports = controllerQuestion;