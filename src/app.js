require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const routes = require("./routes");

const app = express();

app.use(morgan(process.env.MORGAN_MODE || "dev"));
app.use(cors());
app.use(express.json());
app.use(routes);

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = app;
