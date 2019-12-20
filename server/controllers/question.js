const Question = require("../model/question");

class QuestionController {
  static createQuestion(req, res, next) {
    const { title, desc, tags } = req.body;
    Question.create({
      title,
      desc,
      tags,
      author: req.decoded.id
    })
      .then(question => {
        res.status(200).json({
          question,
          message: "Success Add Question"
        });
      })
      .catch(next);
  }

  static getOneQuestion(req, res, next) {
    const { id } = req.params;
    Question.findOne({
      _id: id
    })
      .populate("views")
      .populate("author")
      .then(question => {
        res.status(200).json(question);
      })
      .catch(next);
  }

  static getAllQuestion(req, res, next) {
    Question.find()
      .populate("author")
      .populate("views")
      .then(questions => {
        res.status(200).json(questions);
      })
      .catch(next);
  }

  static editQuestion(req, res, next) {
    let input = req.body;
    let data = {};
    for (let index in input) {
      data[index] = input[index];
    }
    Question.findOneAndUpdate(
      {
        _id: req.params.id
      },
      data,
      {
        new: true
      }
    )
      .then(question => {
        res.status(200).json({
          question,
          message: "Success Update Question"
        });
      })
      .catch(next);
  }

  static upvote(req, res, next) {
    Question.findOne({
      _id: req.params.id
    })
      .then(question => {
        if (question.upvote.includes(req.decoded.id)) {
          question.upvote.pull(req.decoded.id);
        } else {
          if (question.downvote.includes(req.decoded.id)) {
            question.downvote.pull(req.decoded.id);
            question.upvote.push(req.decoded.id);
          } else {
            question.upvote.push(req.decoded.id);
          }
        }
        question = question.save();
        res.status(200).json(question);
      })
      .catch(next);
  }

  static downvote(req, res, next) {
    Question.findOne({
      _id: req.params.id
    })
      .then(question => {
        if (question.downvote.includes(req.decoded.id)) {
          question.downvote.pull(req.decoded.id);
        } else {
          if (question.upvote.includes(req.decoded.id)) {
            question.upvote.pull(req.decoded.id);
            question.downvote.push(req.decoded.id);
          } else {
            question.downvote.push(req.decoded.id);
          }
        }
        question = question.save();
        res.status(200).json(question);
      })
      .catch(next);
  }

  static countView(req, res, next) {
    Question.findOne({
      _id: req.params.id
    })
      .then(question => {
        if (question.views.includes(req.decoded.id)) {
          res.status(200).json(question);
        } else {
          question.views.push(req.decoded.id);
          question = question.save();
          res.status(200).json(question);
        }
      })
      .then(question => {
        res.status(200).json(question);
      })
      .catch(next);
  }

  static deleteQuestion(req, res, next) {
    Question.deleteOne({
      _id: req.params.id
    })
      .then(question => {
        res.status(200).json({
          question,
          message: "Success Delete Question"
        });
      })
      .catch(next);
  }
}

module.exports = QuestionController;
