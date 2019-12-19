'use strict'

function errorHandler(err, req, res, next) {

    const errorResponse = {}
    // console.log(err.errors);
    // res.send(err)
    switch (err.name) {
        case 'ValidationError':
            errorResponse.code = 400
            errorResponse.status = 'Bad Request'
            if (Object.keys(err.errors).length > 1) {
                errorResponse.message = []
                Object.values(err.errors).forEach(function (errorValidationData) {
                    errorResponse.message.push(errorValidationData.message)
                })
            }
            else {
                errorResponse.message = Object.values(err.errors)[0].message
            }
            res.status(errorResponse.code).json(errorResponse)
            break
        case 'LoginError':
            errorResponse.code = 400
            errorResponse.status = 'Bad Request'
            errorResponse.message = err.message
            res.status(errorResponse.code).json(errorResponse)
            break
        case 'CastError':
            errorResponse.code = 404
            errorResponse.status = 'Not Found'
            errorResponse.message = `No data Match with ID ${err.value}`
            res.status(errorResponse.code).json(errorResponse)
            break
        case 'JsonWebTokenError':
            errorResponse.code = 401
            errorResponse.status = 'Unauthorized'
            errorResponse.message = 'Invalid Access Token'
            res.status(errorResponse.code).json(errorResponse)
            break
        case 'AuthenticatingError':
            errorResponse.code = 401
            errorResponse.status = 'AthenticatingError'
            errorResponse.message = err.message
            res.status(errorResponse.code).json(errorResponse)
            break
        default:
            res.status(500).json({
                code: 500,
                status: 'Error',
                message: 'Internal Server Error !'
            })
    }
}

module.exports = errorHandler