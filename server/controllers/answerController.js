const Answer = require('../models/answer');
const Question = require('../models/question');

class AnswerController {
  static getAllAnswers(req, res, next) {
    Answer.find()
      .then(function(answers) {
        res.json(answers);
      })
      .catch(next);
  }

  static addNewAnswer(req, res, next) {
    const {description, questionId} = req.body;
    const owner = req.payload.id;

    Answer.create({description, owner})
      .then(function(answer) {
        return Question.findOneAndUpdate(
          {_id: questionId},
          {$push: {answers: answer._id}},
          {new: true},
        );
      })
      .then(function(result) {
        res.json(result);
      })
      .catch(next);
  }

  static pushVote(req, res, next) {
    const {value, answerId} = req.body;
    const owner = req.payload.id;

    const errors = []

    if (!value) errors.push('value is required')
    if (!answerId) errors.push('answer id is required')

    if (errors.length > 0) next({ name: 'BadRequest', message: errors })

    Answer.findOne({_id: answerId, 'votes.voter': owner})
      .then(function(answer) {
        if (!answer) {
          // push new voter
          return Answer.findOneAndUpdate(
            {_id: answerId},
            {$push: {votes: {voter: owner, value}}},
            {new: true},
          );
        } else {
          if (answer.votes[0].value == value) {
            // remove voter
            return Answer.findOneAndUpdate(
              {_id: answerId},
              {$pull: {votes: {voter: owner}}},
              {new: true},
            );
          } else {
            // update voter
            return Answer.findOneAndUpdate(
              {_id: answerId, 'votes.voter': owner},
              {$set: {'votes.$.value': value}},
              {new: true},
            );
          }
        }
      })
      .then(function(result) {
        res.json(result);
      })
      .catch(next);
  }
}

module.exports = AnswerController;
