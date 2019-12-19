const router = require("express").Router();
const usersRoute = require('./usersRoute.js');
const answersRoute = require('./answersRoute.js');
const questionsRoute = require('./questionsRoute.js');

router.use("/users", usersRoute);
router.use("/answers", answersRoute);
router.use("/questions", questionsRoute);

module.exports = router;