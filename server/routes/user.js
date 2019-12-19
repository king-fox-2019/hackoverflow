const router = require("express").Router();
const user = require("../controllers/UserController");
const question = require("../controllers/QuestionController");
const authentication = require("../middlewares/authentication");

router.get("/user/questions", authentication, question.fetchQuestionByAuthor);
router.get("/user/currentuser", authentication, user.getCurrentUser);
router.post("/signup", user.signupUser);
router.post("/signin", user.signinUser);

module.exports = router;
