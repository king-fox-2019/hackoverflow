function errorHandler (err, req, res, next) {
  console.log(err);
  switch(err.name){
    case "ValidationError": {
      err.status = 400
      err.message = 'invalid input'
      break
    }
    case "JsonWebTokenError": {
      err.status = 400
      break
    }
    default: {
      err.status = err.status || 500
      err.message = err.message || 'internal server error'
    }
  }
  res.status(err.status).json({message: err.message})
}

module.exports = errorHandler