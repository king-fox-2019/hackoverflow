const { Schema, model } = require("mongoose");

const answerSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title must be filled in"]
    },
    description: {
      type: String,
      required: [true, "Description must be filled in"]
    },
    upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

const Answer = model("Answer", answerSchema);

module.exports = Answer;
