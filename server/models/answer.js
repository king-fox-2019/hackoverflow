'use strict'

const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title required"]
    },
    description: {
      type: String,
      required: [true, "Content required"],
    },
    QuestionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question"
    },
    upvotes: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    downvotes: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Answer", AnswerSchema);