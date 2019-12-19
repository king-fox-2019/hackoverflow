const routes = require('express').Router()
const userRoutes = require('./user')
const questionRoutes = require('./question')
const answerRoutes = require('./answer')

routes.get('/',(req,res,next)=>{
    res.status(200).json({
        message: 'Connected To Server Success'
    })
})

routes.use('/user',userRoutes)
routes.use('/question',questionRoutes)
routes.use('/answer',answerRoutes)

module.exports = routes