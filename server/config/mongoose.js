const mongoose = require('mongoose')

mongoose.connect(
  // 'mongodb+srv://admin:admin@clusterhacktivoverflow-pcicm.gcp.mongodb.net/test?retryWrites=true&w=majority',
  'mongodb://localhost:27017/hackoverflowdev',
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    if (err) console.log('Failed connect to database')
    else console.log('Success connect to database')
  }
)

module.exports = mongoose
