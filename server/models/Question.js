const { Schema, model } = require("mongoose");

const questionSchema = new Schema(
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
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }]
  },
  { timestamps: true }
);

const Question = model("Question", questionSchema);

module.exports = Question;
