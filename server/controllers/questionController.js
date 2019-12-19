const Question = require('../models/Question.js')
const Answer = require('../models/Answer.js')

class QuestionController{

  static showAll(req, res, next){
    Question
      .find({})
      .populate('UserId', 'username')
      .then((questionData) => {
        res.status(200).json(questionData)
      })
      .catch(next)
  }

  static showOne(req, res, next){
    Question
      .findById(req.params.id)
      .populate('UserId', 'username')
      .then((questionData) => {
        res.status(200).json(questionData)
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
    Question
      .findByIdAndUpdate(req.params.id, updateObj, {new: true})
      .then((questionData) => {
        res.status(200).json(questionData)
      })
      .catch(next)
  }

  static create(req, res, next){
    let { title, description } = req.body
    let questionObj = { title, description, UserId: req.user.id}
    Question
      .create(questionObj)
      .then((questionData) => {
        res.status(201).json(questionData)
      })
      .catch(next)
  }

  static edit(req, res, next){
    let { description } = req.body
    let questionObj = { description }
    Question
      .findByIdAndUpdate(req.params.id, questionObj, { new: true })
      .then((questionData) => {
        res.status(200).json(questionData)
      })
      .catch(next)
  }

  static delete(req, res, next){
    Question
      .findByIdAndDelete(req.params.id)
      .then(() => {
        return Answer.findOneAndDelete({QuestionId: req.params.id})
      })
      .then(() => {
        res.status(200).json()
      })
      .catch(next)
  }
}

module.exports = QuestionController