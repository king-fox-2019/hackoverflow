const Answer = require("../model/answer");

class AnswerController {
  static createAnswer(req, res, next) {
    const { desc } = req.body;
    Answer.create({
      desc,
      author: req.decoded.id,
      questionId: req.params.id
    })
      .then(answer => {
        res.status(201).json({
          answer,
          message: "Success Post Answer"
        });
      })
      .catch(next);
  }

  static getAllAnswer(req, res, next) {
    Answer.find({
      questionId: req.params.id
    })
      .populate("author")
      .then(answer => {
        res.status(200).json(answer);
      })
      .catch(next);
  }

  static getOneAnswer(req, res, next) {
    Answer.findOne({
      _id: req.params.id
    })
      .then(answer => {
        res.status(200).json(answer);
      })
      .catch(next);
  }

  static upvote(req, res, next) {
    Answer.findOne({
      _id: req.params.id
    })
      .then(answer => {
        if (answer.upvote.includes(req.decoded.id)) {
          answer.upvote.pull(req.decoded.id);
          answer = answer.save();
        } else {
          if (answer.downvote.includes(req.decoded.id)) {
            answer.downvote.pull(req.decoded.id);
            answer.upvote.push(req.decoded.id);
            answer = answer.save();
          } else {
            answer.upvote.push(req.decoded.id);
            answer = answer.save();
          }
        }
        res.status(200).json(answer);
      })
      .catch(next);
  }

  static downvote(req, res, next) {
    Answer.findOne({
      _id: req.params.id
    })
      .then(answer => {
        if (answer.downvote.includes(req.decoded.id)) {
          answer.downvote.pull(req.decoded.id);
          answer = answer.save();
        } else {
          if (answer.upvote.includes(req.decoded.id)) {
            answer.upvote.pull(req.decoded.id);
            answer.downvote.push(req.decoded.id);
            answer = answer.save();
          } else {
            answer.downvote.push(req.decoded.id);
            answer = answer.save();
          }
        }
        res.status(200).json(answer);
      })
      .catch(next);
  }

  static editAnswer(req, res, next) {
    const { desc } = req.body;
    Answer.findOneAndUpdate(
      {
        _id: req.params.id
      },
      {
        desc
      },
      {
        new: true
      }
    )
      .then(answer => {
        res.status(200).json({
          answer,
          message: "Succes Update Answer"
        });
      })
      .catch(next);
  }

  static deleteAnswer(req, res, next) {
    Answer.deleteOne({
      _id: req.params.id
    })
      .then(answer => {
        res.status(200).json({
          answer,
          message: "Success Delete Answer"
        });
      })
      .catch(next);
  }
}

module.exports = AnswerController;
