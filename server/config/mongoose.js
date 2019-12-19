const mongoose = require('mongoose')
const MongoURI = 'mongodb://localhost:27017/hacktiv-overflow'

mongoose.connect(MongoURI,{
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(_=> console.log('connected to database'))
.catch(_=> console.log('cant connect to database'));

module.exports = mongoose