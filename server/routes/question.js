const router = require("express").Router();
const Question = require("../controllers/QuestionController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorizationQuestion");

router.get("/", Question.fetchAllQuestion);
router.get("/:id", Question.fetchQuestionById);
router.post("/", authentication, Question.createQuestion);
router.patch("/:id/upvote", authentication, Question.upvoteQuestion);
router.patch("/:id/downvote", authentication, Question.downvoteQuestion);
router.put(
  "/:id",
  authentication,
  authorization,
  Question.updateQuestionByAuthor
);
router.delete("/:id", authentication, authorization, Question.deleteQuestion);

module.exports = router;
