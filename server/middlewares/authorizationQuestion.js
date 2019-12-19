const Question = require("../models/Question");

module.exports = (req, res, next) => {
  const idQuestion = req.params.id;
  Question.findById(idQuestion)
    .then(question => {
      if (question) {
        const authorId = req.decoded._id;
        const match = question.author == authorId;
        if (match) {
          next();
        } else {
          throw {
            code: 403,
            message: "Unauthorized User"
          };
        }
      } else {
        throw {
          code: 404,
          message: "Question not found"
        };
      }
    })
    .catch(err => {
      next(err);
    });
};
