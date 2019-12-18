const { Answer } = require('../models')

class Answerontroller {
  static postAnswer(req, res, next) {
    const { content } = req.body
    Answer.create({
      author: req.user._id,
      question: req.params.id,
      content
    })
      .then(answer => {
        return answer
          .populate('author', '-password')
          .populate({
            path: 'question',
            populate: { path: 'author', select: '-password' }
          })
          .execPopulate()
      })
      .then(answer => {
        res.status(201).json({ message: 'Answer posted', data: answer })
      })
      .catch(next)
  }

  static getAllQuestionAnswers(req, res, next) {
    Answer.find({ question: req.params.id }, '-question')
      .populate('author', '-password')
      .then(answers => {
        res.status(200).json({ data: answers })
      })
      .catch(next)
  }

  static getAllUserAnswers(req, res, next) {
    Answer.find({ author: req.user._id }, '-author')
      .populate({
        path: 'question',
        populate: { path: 'author', select: '-password' }
      })
      .then(answers => {
        res.status(200).json({ data: answers })
      })
      .catch(next)
  }

  static getOneAnswer(req, res, next) {
    Answer.findById(req.params.answerId)
      .populate('author', '-password')
      .populate({
        path: 'question',
        populate: { path: 'author', select: '-password' }
      })
      .then(answer => {
        res.status(200).json({ data: answer })
      })
      .catch(next)
  }
}

module.exports = Answerontroller
