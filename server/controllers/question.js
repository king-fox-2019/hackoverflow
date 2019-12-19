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
    if (req.query.q) {
      const { q } = req.query;
      Question
        .find({ title : { $regex: q, $options: 'i' }})
        .populate({
          path: 'userId',
          select: '-password',
        })
        .then((questions) => {
          res.status(200).json(questions);
        })
        .catch(next);
    } else {
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
  }
  static myQuestions(req, res, next) {
    const { id } = req.token;
    Question
      .find({ userId: id })
      .then((questions) => {
        res.status(200).json(questions);
      })
  }
  static remove(req, res, next) {
    const { id } = req.params;
    Question
      .deleteOne({ _id: id })
      .then(() => {
        res.status(200).json({ message: 'Question Deleted!' });
      })
      .catch(next);

  }
  static upVotes(req, res, next) {
    const { id } = req.params
    Question
      .updateOne({ _id: id}, { $inc: { upVotes: 1 } })
      .then(() => {
        res.status(200).json({ message: 'Thank You!' });
      })
      .catch(next);
  }
  static downVotes(req, res, next) {
    const { id } = req.params
    Question
      .updateOne({ _id: id}, { $inc: { downVotes: 1 } })
      .then(() => {
        res.status(200).json({ message: "We'll Take a look!" });
      })
      .catch(next);
  }
}

module.exports = QuestionController;
