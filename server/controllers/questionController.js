'use strict'

const Question = require('../models/question')

class QuestionController {
    static getAll(req, res, next) {
        Question.find()
            .populate('numAnswers')
            .populate('questioner', 'displayName')
            // .exec()
            .then(questions => {
                res.status(200).json({
                    code: 200,
                    message: 'success',
                    questions
                })
            })
            .catch(next)
    }

    static create(req, res, next) {
        const questionData = {
            questioner: req.userData.userId,
            title: req.body.title,
            body: req.body.question,
            status: 'not-solved'
        }
        Question.create(questionData)
            .then(question => {
                res.status(201).json({
                    code: 201,
                    status: "success",
                    question
                })
            })
            .catch(next)
    }

    static detail(req, res, next) {
        Question.findOne({
            _id: req.params.id
        })
            .then(question => {
                res.status(200).json(question)
            })
            .catch(next)
    }

    static update(req, res, next) {
        const id = req.params.id
        Question.findByIdAndUpdate({
            _id: id
        }, {
            title: req.body.title,
            body: req.body.question
        }, { runValidators: true })
            .then(question => {
                res.status(200).json({
                    code: 200,
                    status: "success",
                    message: `update question success`,
                    question
                })
            })
            .catch(next)
    }
}

module.exports = QuestionController