const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser:true, useUnifiedTopology:true})

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoose connected');
  
});

// module.exports = db