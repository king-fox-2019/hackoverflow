function errorHandler (err, req, res, next) {

  console.log('errorHandler Invoked'); 
  if (err.name == "JsonWebTokenError") {
    console.log('5')
    res.status(401).json({ message : "invalidToken" })
  } else if (err.name=="ValidationError"){
    console.log('8')
    let message = err.message 
    res.status(400).json({ message : message })
  } else {
    console.log('12')
    let message = err.message || "internal server error"
    let status = err.status || 500
    console.log('message => ',message);

    res.status(status).json({
      message : message
    })
  }
}

module.exports = errorHandler;