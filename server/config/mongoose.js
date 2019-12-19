const mongoose = require('mongoose')
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost/stunOverflow-king'
module.exports = mongoose.connect(mongoUri,{
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true,
},(err)=>{
    err ? console.log('failed connect database!') : console.log('success connect database')
})