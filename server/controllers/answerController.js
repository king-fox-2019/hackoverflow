
const Answer = require('../models/Answer')

class AnswerController {

   static create(req, res, next) {

      Answer
      .create(req.body)
      .then(answer => {
         res.status(201).json({answer})
      })
      .catch(next)
   }

   static readAll(req, res, next) {

      Answer
      .find({question: req.params.questionId})
      .then(answers => {
         res.status(200).json({answers})
      })
      .catch(next)
   }

   static update(req, res, next) {

      Answer
      .updateOne({_id: req.params.id}, {$set: req.body})
      .then(results => {
         console.log(results)
         res.status(200).json({message: 'The answer has been successfully updated'})
      })
      .catch(next)
   }

   static delete(req, res, next) {
      
      Answer
      .delete({_id: req.params.id})
      .then(results => {
         console.log(results)
         res.status(200).json({message: 'The answer has been successfully deleted'})
      })
      .catch(next)
   }
}

module.exports = AnswerController