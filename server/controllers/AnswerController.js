const Answer = require("../models/Answer");
const Question = require("../models/Question");
const User = require("../models/User");

class AnswerController {
  static createAnswer(req, res, next) {
    const author = req.decoded._id;
    const { title, description, question } = req.body;
    const docs = { title, description, question, author };
    let currentAnswer;
    Answer.create(docs)
      .then(answer => {
        currentAnswer = answer;
        return Question.findByIdAndUpdate(answer.question, {
          $push: { answers: answer._id }
        });
      })
      .then(question => {
        const responses = {
          message: "Answer successfully created",
          answer: currentAnswer
        };
        res.status(201).json(responses);
      })
      .catch(err => {
        next(err);
      });
  }
  static fetchAnswerByQuestion(req, res, next) {
    const question = req.body.question;
    const condition = {
      question
    };
    Answer.find(condition)
      .populate("author")
      .then(answers => {
        const responses = {
          message: "Fetching answer success",
          answers
        };
        res.status(200).json(responses);
      })
      .catch(err => {
        next(err);
      });
  }
  static updateAnswerByAuthor(req, res, next) {
    const id = req.params.id;
    const { title, description } = req.body;
    const update = { title, description };
    Answer.findByIdAndUpdate(id, update)
      .then(() => {
        const responses = {
          message: "Answer updated"
        };
        res.status(200).json(responses);
      })
      .catch(err => {
        next(err);
      });
  }
  static upvoteAnswer(req, res, next) {
    const id = req.params.id;
    const author = req.decoded._id;
    Answer.findById(id)
      .then(question => {
        question.downvotes.pull(author);
        const upvotes = question.upvotes;
        let exist = false;
        upvotes.forEach(upvoter => {
          if (upvoter == author) {
            exist = true;
            question.upvotes.pull(author);
          }
        });
        if (!exist) {
          question.upvotes.push(author);
        }
        question.save();
        const responses = {
          message: "Upvote to answer success"
        };
        res.status(200).json(responses);
      })
      .catch(err => {
        next(err);
      });
  }
  static downvoteAnswer(req, res, next) {
    const id = req.params.id;
    const author = req.decoded._id;
    Answer.findById(id)
      .then(question => {
        question.upvotes.pull(author);
        const downvotes = question.downvotes;
        let exist = false;
        downvotes.forEach(downvoter => {
          if (downvoter == author) {
            exist = true;
            question.downvotes.pull(author);
          }
        });
        if (!exist) {
          question.downvotes.push(author);
        }
        question.save();
        const responses = {
          message: "Downvote to answer success"
        };
        res.status(200).json(responses);
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = AnswerController;
