'use strict';

// import Question model
const { Question } = require('../models');

class QuestionController {
  static askQuestion(req, res, next) {
    const { id } = req.token;
    const { title, description } = req.body;
    const question = {
      userId: id,
      title,
      description,
    };
    Question
      .create(question)
      .then((success) => {
        res.status(201).json(success);
      })
      .catch(next);
  }
  static getAllQuestions(req, res, next) {
    Question
      .find()
      .populate({
        path: 'userId',
        select: '-password',
      })
      .then((questions) => {
        res.status(200).json(questions);
      })
      .catch(next);
  }
  static remove(req, res, next) {

  }
  static updateQuestion() {

  }
  static upVotes(req, res, next) {

  }
  static downVotes(req, res, next) {
    
  }
}

module.exports = QuestionController;
