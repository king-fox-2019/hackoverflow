const Answer = require('../models/answer')
const Question = require('../models/question')

class AnswerController {
  static getAllAnswers(req, res, next) {
    Answer.find()
      .then(function (answers) {
        res.json(answers)
      })
      .catch(next)
  }

  static addNewAnswer(req, res, next) {
    const {description, questionId} = req.body;
    const owner = req.payload.id;

    Answer.create({description, owner})
      .then(function(answer) {
        return Question.findOneAndUpdate(
          {_id: questionId},
          {$push: {answers: answer._id}},
          {new: true}
        );
      })
      .then(function(result) {
        res.json(result);
      })
      .catch(next);
  }
}

module.exports = AnswerController;
