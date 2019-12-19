const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(
    // "mongodb://localhost:27017/hacktivOverflow",
    "mongodb+srv://foobar:foobar@cluster0-2ytp0.mongodb.net/test?retryWrites=true&w=majority",
    {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    err => {
      if (err) console.log("Failed connect to database");
      else console.log("Connected to database");
    }
  );
};
