'use strict'

const router = require('express').Router()
const questionRouter = require('./questions')
const userRouter = require('./users')
const answerRouter = require('./answers')
const { authentication } = require('../middlewares/auth')

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Connected to E-commerce website!"
  });
});

router.use("/users", userRouter);
router.use(authentication);
router.use("/answers", answerRouter);
router.use("/questions", questionRouter);

module.exports = router;