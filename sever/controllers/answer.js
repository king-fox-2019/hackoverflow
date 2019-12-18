const Answer = require('../models/answer')
const Question = require('../models/question')

class answerController {
  static create(req, res, next) {
    let answer
    const user = req.loggedUser._id
    const { title, description, questionId } = req.body
    Answer
      .create({ title, description, question : questionId, user})
      .then(resultAnswer => {
        answer = resultAnswer
        return Question.findById(questionId)
      })
      .then(question => {
        if (!question) {
          throw {status : 400, msg : 'question not found'}
        } else {
          question.answers.push(answer._id)
          res.status(201).json(answer)
        }
      })
  }
  static findAll(req, res, next) {

    let search = {}
    if (req.query.user) { //url?user=true
      search.user = req.loggedUser._id
    }
    Answer
      .find(search)
      .populate('user') //whose
      .sort({ createdAt : 'desc' })
      .then(answers => {
        res.status(200).json(answers)
      })
      .catch(next)
  }
  static findOne(req, res, next) {
    let answerId = req.params.id
    Answer
      .findById(id)
      .populate('user') //whose
      .then(answer => {
        if (!answer) {
          throw {status : 400, msg : 'answer not found'}
        }
        res.status(200).json(answer)
      })
      .catch(next)
  }
  static update(req, res, next) {
    let answerId = req.params.id
    const description = req.body
    Answer
      .findByIdAndUpdate(answerId, { description })
      .then(answer => {
        if (!answer) {
          throw { status : 400, msg : 'answer not found'}
        } else {
          res.status(200).json(answer)
        }
      })
      .catch(next)
  }
  static upVote(req, res, next) {
    let answerId = req.params.id
    Answer
      .findById(answerId)
      .populate('user') //whose
      .then(answer => {
        if (!answer) {
          throw { status : 400, msg : 'answer not found'}
        }
        let user = req.loggedUser._id
        console.log(user, "ini dr ans controllerrrrr")
        //user mau upvote
        if (!answer.upVote.includes(user)) { //kalo belom perna upvote, tambahin
          answer.upVote.push(user)
          if (answer.downVote.includes(user)) { //cek tetangga downvote, kalo ada user, apus (cm bs pilih up/down)
            let userPoint = answer.downVote.indexOf(user)
            answer.downVote.splice(userPoint, 1) //start-how many
          }
        } else { //kalo uda perna upvote, apus
          let userPoint = answer.upVote.idexOf(user)
          answer.upVote.splice(userPoint, 1)
        }
        answer.save()
        res.status(200).json(answer)
      })
      .catch(next)
  }
  static downVote(req, res, next) {
    let answerId = req.params.id
    Answer
      .findById(answerId)
      .populate('user')
      .then(answer => {
        if (!answer) {
          throw { status : 400, msg : 'answer not found'}
        }
        let user = req.loggedUser._id
        if (!answer.downVote.includes(user)) {
          answer.downVote.push(user)
          if (answer.upVote.includes(user)) {
            let userPoint = answer.upVote.indexOf(user)
            answer.upVote.splice(userPoint, 1) //start-how many
          }
        } else {
          let userPoint = answer.downVote.indexOf(user)
          answer.downVote.splice(userPoint, 1)
        }
        answer.save()
        res.status(200).json(answer)
      })
      .catch(next)
  }
}

module.exports = answerController