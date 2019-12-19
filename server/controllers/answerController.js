const { Answer } = require('../models')

class AnswerController {
  static create(req, res, next) {
    const { title, description, questionId } = req.body
    const author = req.decoded._id
    Answer.create({
      title,
      description,
      author,
      questionId
    })
      .then(answer => {
        res.status(201).json(answer)
      })
      .catch(next)
  }

  static findAll(req, res, next) {
    console.log(req.params, '**********')
    Answer.find({ questionId: req.params.questionId })
      .populate('author')
      .populate('upvotes')
      .populate('downvotes')
      .then(answers => {
        res.status(200).json(answers)
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    Answer.findById(req.params.answerId)
      .then(answer => {
        res.status(200).json(answer)
      })
      .catch(next)
  }

  static update(req, res, next) {
    console.log(req.body, '{{{{{{{{{')
    console.log(req.params.answerId, '+++++++++++')
    const update = {}
    const { questionId, description } = req.body
    if (description) update.description = description
    update.questionId = questionId
    Answer.findByIdAndUpdate(req.params.answerId, update)
      .then(answer => {
        res.status(200).json(answer)
      })
      .catch(next)
  }

  static destroy(req, res, next) {
    console.log(req.params.answerId, '!!!!!!!!!!!')
    Answer.findByIdAndDelete(req.params.answerId)
      .then(answer => {
        res.status(200).json(answer)
      })
      .catch(next)
  }

  static vote(req, res, next) {
    let vote = req.body.vote
    let userId = req.decoded._id
    let answerId = req.params.answerId
    Answer.findByIdAndUpdate(answerId, {
      $pull: {
        downvotes: userId,
        upvotes: userId
      }
    }, { new: true })
      .then(answer => {
        if (vote === 'up') {
          return Answer.findByIdAndUpdate(answerId, {
            $push: {
              upvotes: userId
            }
          }, { new: true }).populate('upvotes').populate('downvotes')
        } else {
          return Answer.findByIdAndUpdate(answerId, {
            $push: {
              downvotes: userId
            }
          }, { new: true }).populate('upvotes').populate('downvotes')
        }      
      })
      .then(answer => {
        res.status(200).json(answer)
      })
      .catch(next)
  }

}

module.exports = AnswerController