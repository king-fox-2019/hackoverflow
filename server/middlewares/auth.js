const User = require("../model/user");
const Question = require("../model/question");
const Answer = require("../model/answer");
const { verifyToken } = require("../helpers/jwt");

module.exports = {
  authenticate(req, res, next) {
    try {
      let decoded = verifyToken(req.headers.token);
      req.decoded = decoded;
      next();
    } catch (err) {
      next(err);
    }
  },
  authorizationQuestion(req, res, next) {
    Question.findOne({
      _id: req.params.id
    })
      .then(question => {
        if (question.author == req.decoded.id) {
          next();
        } else {
          throw {
            status: 403,
            message: "You dont have permission to do that"
          };
        }
      })
      .catch(next);
  },
  authorizationAnswer(req, res, next) {
    Answer.findOne({
      _id: req.params.id
    })
      .then(answer => {
        if (answer.author == req.decoded.id) {
          next();
        } else {
          throw {
            status: 403,
            message: "You dont have permission to do that"
          };
        }
      })
      .catch(next);
  }
};
