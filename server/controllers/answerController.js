const Answer = require('../models/Answer.js')

class AnswerController{
  static getAnswer(req, res, next){
    Answer
      .find({QuestionId: req.params.id})
      .populate('UserId', 'username')
      .then((answerData) => {
        res.status(200).json(answerData)
      })
      .catch(next)
  }

  static vote(req, res, next){
    let changeVote = {}
    let changeOtherVote = {}
    if (req.body.vote == 'up'){
      changeVote['upvotes'] = req.user.id
      changeOtherVote['downvotes'] = req.user.id
    }
    else if (req.body.vote == 'down'){
      changeVote['downvotes'] = req.user.id
      changeOtherVote['upvotes'] = req.user.id
    }
    else {
      next('Specify your vote')
    }
    let updateObj = {$addToSet: changeVote, $pull: changeOtherVote}
    Answer
      .findByIdAndUpdate(req.params.id, updateObj, {new: true})
      .then((answerData) => {
        res.status(200).json(answerData)
      })
      .catch(next)
  }

  static create(req, res, next){
    let { description, QuestionId } = req.body
    let answerObj = { description, UserId: req.user.id, QuestionId}
    Answer
      .create(answerObj)
      .then((answerData) => {
        res.status(201).json(answerData)
      })
      .catch(next)
  }

  static edit(req, res, next){
    let { description } = req.body
    let answerObj = { description }
    Answer
      .findByIdAndUpdate(req.params.id, answerObj, { new: true })
      .then((answerData) => {
        res.status(200).json(answerData)
      })
      .catch(next)

  }

  static delete(req, res, next){
    Answer
      .findByIdAndDelete(req.params.id)
      .then((answerData) => {
        res.status(200).json(answerData)
      })
      .catch(next)
  }
}

module.exports = AnswerController