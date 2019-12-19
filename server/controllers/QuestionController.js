const Question = require("../models/Question");
const Answer = require("../models/Answer");
const User = require("../models/User");

class QuestionController {
  static createQuestion(req, res, next) {
    const author = req.decoded._id;
    const { title, description } = req.body;
    const docs = { title, description, author };
    Question.create(docs)
      .then(question => {
        const responses = {
          message: "Question successfully created",
          question
        };
        res.status(201).json(responses);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  }
  static fetchAllQuestion(req, res, next) {
    let condition = {};
    const search = req.query.search;
    if (search) {
      condition = {
        $or: [
          { title: { $regex: `${search}`, $options: "-i" } },
          { description: { $regex: `${search}`, $options: "-i" } }
        ]
      };
    }
    Question.find(condition)
      .populate("author")
      .populate("answers")
      .then(questions => {
        const responses = {
          message: "Fetching question success",
          questions
        };
        res.status(200).json(responses);
      })
      .catch(err => {
        next(err);
      });
  }
  static fetchQuestionByAuthor(req, res, next) {
    const author = req.decoded._id;
    let condition = { author };
    Question.find(condition)
      .populate("author")
      .populate("answers")
      .then(questions => {
        const responses = {
          message: "Fetching question success",
          questions
        };
        res.status(200).json(responses);
      })
      .catch(err => {
        next(err);
      });
  }
  static fetchQuestionById(req, res, next) {
    const id = req.params.id;
    Question.findById(id)
      .populate("author")
      .populate({
        path: "answers",
        populate: { path: "author", model: "User" }
      })
      .then(question => {
        if (question) {
          const responses = {
            message: "Fetching question success",
            question
          };
          res.status(200).json(responses);
        } else {
          throw {
            code: 404,
            message: "Question not found"
          };
        }
      })
      .catch(err => {
        next(err);
      });
  }
  static updateQuestionByAuthor(req, res, next) {
    const id = req.params.id;
    const { title, description } = req.body;
    const update = { title, description };
    Question.findByIdAndUpdate(id, update)
      .then(() => {
        const responses = {
          message: "Question updated"
        };
        res.status(200).json(responses);
      })
      .catch(err => {
        next(err);
      });
  }
  static deleteQuestion(req, res, next) {
    const id = req.params.id;
    Question.findByIdAndRemove(id)
      .then(() => {
        const condition = {
          question: id
        };
        return Answer.deleteMany(condition);
      })
      .then(() => {
        const responses = {
          message: "Question deleted"
        };
        res.status(200).json(responses);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  }
  static upvoteQuestion(req, res, next) {
    const id = req.params.id;
    const author = req.decoded._id;
    Question.findById(id)
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
          message: "Upvote to question success"
        };
        res.status(200).json(responses);
      })
      .catch(err => {
        next(err);
      });
  }
  static downvoteQuestion(req, res, next) {
    const id = req.params.id;
    const author = req.decoded._id;
    Question.findById(id)
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
          message: "Downvote to question success"
        };
        res.status(200).json(responses);
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = QuestionController;
