const mongoose = require('mongoose')
const URI = process.env.MONGODB_URI || 'mongodb://localhost/default'
const NODE_ENV = process.env.NODE_ENV

mongoose
  .connect(`${URI}${NODE_ENV ? '-' + NODE_ENV : ''}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() =>
    console.log(
      'mongodb connected at',
      `${URI}${NODE_ENV ? '-' + NODE_ENV : ''}`
    )
  )
  .catch(err => console.log('mongodb connection failed\n', err))
