if (
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "testing"
) {
  require("dotenv").config();
}

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
// require
require("./config/mongoose");
require("./helpers/sendMail");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/", routes);

app.use(errorHandler);

module.exports = app;
