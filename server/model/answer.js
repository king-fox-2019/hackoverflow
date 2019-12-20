const { Schema, model } = require("mongoose");

const answerSchema = new Schema({
  desc: {
    type: String,
    required: [true, "Please Input Description"]
  },
  upvote: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  downvote: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  questionId: {
    type: Schema.Types.ObjectId,
    ref: "Question"
  }
});

const Answer = model("Answer", answerSchema);

module.exports = Answer;
