const router = require("express").Router();
const userRoute = require("./user");
const questionRoute = require("./question");
const answerRoute = require("./answer");

router.use("/answers", answerRoute);
router.use("/questions", questionRoute);
router.use("/", userRoute);

module.exports = router;
