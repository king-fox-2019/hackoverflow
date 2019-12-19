const mongoose = require('mongoose')
const db = process.env.URL_DB
const dbAtlas = process.env.MONGO_ATLAS

// if (process.env.NODE_ENV || 'development') {
//     mongoose.connect(db, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true,
//         useFindAndModify: false
//     }, function (err) {
//         if (err) console.log("mongoose connect failed", err)
//         else console.log(`(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧stuck successfully connect to mongodb `);
//     })
// } else {
mongoose.connect(process.env.MONGO_ATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, function (err) {
    if (err) console.log("mongoose connect failed", err)
    else console.log(`(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧stuck successfully connect to atlas `);
})
// }