'use strict'

const modelAnswer = require('../models/answer')

class AnswerController {

    static getAnswers(req, res, next) {
        const questionId = req.params.questionId
        modelAnswer.find({
            questionId
        })
            .populate('answerer', 'displayName')
            .then(answers => {
                res.status(200).json({
                    code: 200,
                    status: 'success',
                    answers
                })
            })
            .catch(next)
    }

    static create(req, res, next) {
        const answerData = {
            answerer: req.userData.userId,
            questionId: req.params.questionId,
            body: req.body.answer
        }

        modelAnswer.create(answerData)
            .then(answer => {
                res.status(201).json({
                    code: 201,
                    status: 'success',
                    answer
                })
            })
            .catch(next)
    }

    static update(req, res, next) {
        const answerId = req.params.answerId
        const updateAnswerData = {
            body: req.body.answer
        }
        modelAnswer.findByIdAndUpdate(answerId, updateAnswerData)
            .then(answer => {
                res.status(200).json({
                    code: 200,
                    status: 'success',
                    answer
                })
            })
            .catch(next)
    }
}

module.exports = AnswerController