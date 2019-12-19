'use strict'

const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title required"]
    },
    description: {
      type: String,
      required: [true, "Content required"],
    },
    category: {
      type: String,
      default: 'Uncategorized',
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

module.exports = mongoose.model("Question", QuestionSchema);