const router = require('express').Router();
const controllerQuestion = require('../controller/question');
const checkToken = require('../middlewares/checkToken');

//view question
router.get('/', controllerQuestion.view);

//check token
router.use(checkToken);
//create question
router.post('/create', controllerQuestion.create);
//view one question
router.get('/:id', controllerQuestion.viewOne);
//delete question
router.delete('/:id', controllerQuestion.delete);

module.exports = router;