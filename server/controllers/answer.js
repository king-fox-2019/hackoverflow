'use strict';

const { Answer } = require('../models');

class AnswerController {
  static addComment(req, res, next) {
    const { questionId } = req.params;
    const { title, description } = req.body;
    Answer
      .create({
        questionId,
        title,
        description
      })
      .then((success) => {
        res.status(201).json(success);
      })
      .catch(next);
  }
  static getComment(req, res, next) {
    const { questionId } = req.params;
    Answer
      .find({ questionId })
      .then((answers) => {
        res.status(200).json(answers);
      })
      .catch(next);
  }
  static upVotes(req, res, next) {
    const { id } = req.params
    Answer
      .updateOne({ _id: id}, { $inc: { upVotes: 1 } })
      .then(() => {
        res.status(200).json({ message: 'Thank You!' });
      })
      .catch(next);
  }
  static downVotes(req, res, next) {
    const { id } = req.params
    Answer
      .updateOne({ _id: id}, { $inc: { downVotes: 1 } })
      .then(() => {
        res.status(200).json({ message: "We'll Take a look!" });
      })
      .catch(next);
  }
};

module.exports = AnswerController;
