const Answer = require('../models/answer')
const Question = require('../models/question')

class questionController {
  static create(req, res, next) {
    const user = req.loggedUser._id
    const { title, description, tags } = req.body
    Question
      .create({ title, description, tags, user })
      .then(question => {
        res.status(201).json(question)
      })
      .catch(next)
  }
  static findAll(req, res, next) {
    let search = {}
    if (req.query.user) {
      console.log(req.query.user, "ada emg????????????");
      
      search.user = req.query.user
    }
    if (req.query.tags) {
      search.tags = req.query.tags
    }
    Question
      .find(search)
      .populate(['user', 'answers'])
      .sort({ createdAt : 'desc' })
      .then(questions => {
        res.status(200).json(questions)
      })
      .catch(next)
  }
  static findOne(req, res, next) {
    let questionId = req.params.id
    Question
    .findById(questionId)
    .populate('user')
    .populate({
      path: 'answers',
      populate: {
        path: 'user'
      }
    })
    .then(question => {
      if (!question) {
        throw {status : 400, msg: 'question not found'}
      }
      res.status(200).json(question)
    })
    .catch(next)
  }
  static update(req, res, next) {
    const questionId = req.params.id
    const { title, description } = req.body
    Question
      .findByIdAndUpdate(questionId, { title, description }, { omitUndefined: true, new: true})
      .then(question => {
        res.status(200).json(question)
      })
      .catch(next)
  }
  static delete(req, res, next) {
    const questionId = req.params.id
    let erase = null
    Question
      .findByIdAndDelete(questionId)
      .then(question => {
        let promiseArr = []
        question.answers.forEach(answer => {
          promiseArr.push(Answer.findByIdAndDelete(answer))
        })
        erase = question
        return Promise.all(promiseArr)
      })
      .then(answers => {
        res.status(200).json(erase)
      })
      .catch(next)
  }
  static upVote(req, res, next) {
    let questionId = req.params.id
    Question
      .findById(questionId)
      .populate('user') //whose
      .then(question => {
        console.log(question, "daetdfgnjkbhgfyushdjknfdkhsfjbcQQQQQQQ");
        if (!question) {
          throw { status : 400, msg : 'question not found'}
        }
        let user = req.loggedUser._id
        console.log(user, "ini dr question controllerrrrr")
        //user mau upvote
        if (!question.upVotes.includes(user)) { //kalo belom perna upvote, tambahin
          question.upVotes.push(user)
          if (question.downVotes.includes(user)) { //cek tetangga downvote, kalo ada user, apus (cm bs pilih up/down)
            
            let userPoint = question.downVotes.indexOf(user)
            question.downVotes.splice(userPoint, 1) //start-how many
          }
        } else { //kalo uda perna upvote, apus
          let userPoint = question.upVotes.indexOf(user)
          question.upVotes.splice(userPoint, 1)
        }
        question.save()
        res.status(200).json(question)
      })
      .catch(next)
  }

  static downVote(req, res, next) {
    let questionId = req.params.id
    Question
      .findById(questionId)
      .populate('user')
      .then(question => {
        if (!question) {
          throw { status : 400, msg : 'question not found'}
        }
        let user = req.loggedUser._id
        if (!question.downVotes.includes(user)) {
          question.downVotes.push(user)
          if (question.upVotes.includes(user)) {
            let userPoint = question.upVotes.indexOf(user)
            question.upVotes.splice(userPoint, 1) //start-how many
          }
        } else {
          let userPoint = question.downVotes.indexOf(user)
          question.downVotes.splice(userPoint, 1)
        }
        question.save()
        res.status(200).json(question)
      })
      .catch(next)
  }
}

module.exports = questionController