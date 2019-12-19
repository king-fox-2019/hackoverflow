const mongoose = require('mongoose')
const mongoUri = process.env.MONGO_URI_ATLAS

mongoose.connect(mongoUri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}, function(err){
    if(err) console.log('failed to connect database')
    else console.log('success to connect to database')
})

module.exports = mongoose