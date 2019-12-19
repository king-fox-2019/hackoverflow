const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TopThreeSchema = new Schema ({
    questionId : [{
        type : mongoose.Types.ObjectId,
        ref :'Question' 
    }]
})

const TopThree = mongoose.model('TopThree',TopThreeSchema)

module.exports = TopThree