const Answer = require("../models/Answer");

module.exports = (req, res, next) => {
  const idAnswer = req.params.id;
  Answer.findById(idAnswer)
    .then(answer => {
      if (answer) {
        const authorId = req.decoded._id;
        const match = answer.author == authorId;
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
