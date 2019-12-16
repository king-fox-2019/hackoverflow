export default (err, req, res, next) => {
  let status, message

  switch (err.name) {
    default:
      status = 500
      message = 'Something went wrong'
      break
  }

  err.name && console.log(err.stack)

  res.status(status).json(message)
}
