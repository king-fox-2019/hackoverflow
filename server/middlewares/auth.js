const {verify} = require('../helpers/token')

function authenticate(req,res,next){
    let token = req.headers.access_token
    if (token) {
        try {
            let payload = verify(token)
            req.id = payload.id
            next()
        } catch (err) {
            next({ code: 400, msg: 'you are not authenticated user' })
        }
    } else {
        next({ code: 400, msg: 'you are not authenticated user' })
    }
}
function authorize(model){
    const Model = require(`../models/${model}`)
    return function(req, res, next ){
        let currentId = req.id
        let id = req.params.id
        Model.findOne({ _id:id })
            .then(model => {
                if(model.user == currentId){
                    next()
                }else{
                    next ({code:401, message:'you are not authorized user'})
                }
            })
    }
}


module.exports = { authenticate , authorize }