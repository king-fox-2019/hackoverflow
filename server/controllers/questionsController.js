'use strict'

const Question = require("../models/question");
const User = require('../models/user')

class QuestionController {
  static readAll(req, res, next) {
    Question.find({})
      .populate('UserId', 'username email')
      .then(questions => {
        res.status(200).json(questions);
      })
      .catch(next);
  }
  static filter(req, res, next) {
    Question.find({category: req.params.val})
      .populate('UserId', 'username email')
      .then(questions => {
        res.status(200).json(questions);
      })
      .catch(next);
  }
  static create(req, res, next) {
    let cat;
    if (!req.body.category) {
      cat = 'Uncategorized'
    } else {
      cat = req.body.category
    }
    let { title, description } = req.body
    Question.create({
      title,
      description,
      category: cat,
      UserId: req.decoded.id
    })
      .then(question => {
        res.status(201).json(question);
      })
      .catch(next);
  }
  static readOne(req, res, next) {
    Question.findById(req.params.id)
      .populate('UserId', 'username email')
      .then(question => {
        res.status(200).json(question);
      })
      .catch(next);
  }
  static update(req, res, next) {
    let { title, description, category } = req.body
    Question.findOneAndUpdate(
      { _id: req.params.id },
      { title, description, category },
      { new: true, omitUndefined: true }
    )
      .then(question => {
        res.status(200).json(question);
      })
      .catch(next);
  }
  static remove(req, res, next) {
    Question.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(204).json({message: "Question successfully deleted"});
      })
      .catch(next);
  }
  static vote(req, res, next) {
    // 'type'= 'upvotes/downvotes',
    let toAdd;
    let toPull
    if (req.body.type === 'upvotes') {
      toAdd = 'upvotes'
      toPull = 'downvotes'
    } else {
      toAdd = 'downvotes'
      toPull = 'upvotes'
    }
    Question.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { [toAdd]: req.decoded.id },
        $pull: { [toPull]: req.decoded.id }
      }, { new: true }
    )
      .then(question => {
        res.status(200).json(question);
      })
      .catch(next);
  }
}

module.exports = QuestionController;
