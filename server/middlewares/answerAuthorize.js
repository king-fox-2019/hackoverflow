const Answer = require('../models/Answer');

module.exports = function(req, res, next) {
    try {
        Answer
            .findOne({ _id: req.params.id })
            .then(data => {
                if (data.user == req.decoded.id) {
                    next()
                } else {
                    let err = {
                        status: 401,
                        msg: 'No access.'
                    }
                    next(err)
                }
            })
            .catch(err => {
                next(err)
            })
    } catch(err) {
        err = {
            status: 404,
            msg: 'Not found.'
        }
        next(err)
    }
}