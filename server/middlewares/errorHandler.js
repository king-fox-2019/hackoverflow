module.exports = (err, req, res, next) => {
  let status, message
  console.log(err.name)

  switch (err.name) {
    default:
      status = err.status || 500
      message = err.message || 'Something went wrong'
      break
  }

  err.name && console.log(err.stack)

  res.status(status).json(message)
}
