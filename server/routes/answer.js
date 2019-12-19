const router = require("express").Router();
const answer = require("../controllers/AnswerController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorizationAnswer");

router.get("/", answer.fetchAnswerByQuestion);
router.post("/", authentication, answer.createAnswer);
router.put("/:id", authentication, authorization, answer.updateAnswerByAuthor);
router.patch("/:id/upvote", authentication, answer.upvoteAnswer);
router.patch("/:id/downvote", authentication, answer.downvoteAnswer);

module.exports = router;
