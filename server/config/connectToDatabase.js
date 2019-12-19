const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(
    // "mongodb://localhost:27017/hacktivOverflow",
    process.env.MONGODB_ATLAS,
    {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    err => {
      if (err) {
        console.log(err);
        console.log("Failed connect to database");
      } else console.log("Connected to database");
    }
  );
};
