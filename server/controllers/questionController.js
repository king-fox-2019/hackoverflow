const Question = require('../models/question');

class QuestionController {
  static getAllQuestions(req, res, next) {
    Question.find()
      .then(function(questions) {
        res.json(questions);
      })
      .catch(next);
  }

  static getDetailQuestion(req, res, next) {
    Question.findById(req.params.questionId)
      .populate('answers')
      .then(function(question) {
        res.json(question);
      })
      .catch(next);
  }

  static createNewQuestion(req, res, next) {
    const {title, description} = req.body;
    const owner = req.payload.id;
    Question.create({
      title,
      description,
      owner,
    })
      .then(function(question) {
        res.json(question);
      })
      .catch(next);
  }

  static pushVote(req, res, next) {
    const {value, questionId} = req.body;
    const errors = [];

    if (!value) errors.push('value is required');
    if (!questionId) errors.push('question id is required');

    if (errors.length > 0) next({name: 'BadRequest', message: errors});

    Question.findOne({_id: questionId, 'votes.voter': req.payload.id})
      .then(function(question) {
        if (!question) {
          // push new voter
          return Question.findOneAndUpdate(
            {_id: questionId},
            {$push: {votes: {voter: req.payload.id, value}}},
            {new: true},
          );
        } else {
          // update voter
          return Question.findOneAndUpdate(
            {_id: questionId, 'votes.voter': req.payload.id},
            {$set: {'votes.$.value': value}},
            {new: true},
          );
        }
      })
      .then(function(result) {
        res.json(result);
      })
      .catch(next);
  }
}

module.exports = QuestionController;
