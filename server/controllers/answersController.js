'use strict'

const Answer = require("../models/answer");
const User = require('../models/user')

class AnswerController {
  static readAll(req, res, next) {
    Answer.find({QuestionId: req.params.id})
      .populate('UserId', 'username email')
      .populate('QuestionId')
      .then(answers => {
        res.status(200).json(answers);
      })
      .catch(next);
  }
  static create(req, res, next) {
    let { title, description, QuestionId } = req.body
    Answer.create({
      title,
      description,
      QuestionId,
      UserId: req.decoded.id
    })
      .then(answer => {
        res.status(201).json(answer);
      })
      .catch(next);
  }
  static readOne(req, res, next) {
    Answer.findById(req.params.id)
      .populate('UserId', 'username email')
      .populate('QuestionId')
      .then(answer => {
        res.status(200).json(answer);
      })
      .catch(next);
  }
  static update(req, res, next) {
    let { title, description } = req.body
    Answer.findOneAndUpdate(
      { _id: req.params.id } ,
      { title, description },
      { new: true, omitUndefined: true }
    )
      .then(answer => {
        res.status(200).json(answer);
      })
      .catch(next);
  }
  static remove(req, res, next) {
    Answer.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(204).json({message: "Answer successfully deleted"});
      })
      .catch(next);
  }
  static vote(req, res, next) {
    // 'type'= 'upvotes/downvotes',
    // 'UserId'= '23d8gwe523d198'
    let toAdd;
    let toPull
    if (req.body.type === 'upvotes') {
      toAdd = 'upvotes'
      toPull = 'downvotes'
    } else {
      toAdd = 'downvotes'
      toPull = 'upvotes'
    }
    Answer.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { [toAdd]: req.body.UserId },
        $pull: { [toPull]: req.body.UserId }
      }, { new: true }
    )
      .then(question => {
        res.status(200).json(question);
      })
      .catch(next);
  }
}

module.exports = AnswerController;
