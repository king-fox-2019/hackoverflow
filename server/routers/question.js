const router = require('express').Router();
const controllerQuestion = require('../controller/question');
const checkToken = require('../middlewares/checkToken');

//check token
router.use(checkToken);
//create question
router.post('/create', controllerQuestion.create);
//view question
router.get('/', controllerQuestion.view);
//view one question
router.get('/:id', controllerQuestion.viewOne);
//delete question
router.delete('/:id', controllerQuestion.delete);

module.exports = router;