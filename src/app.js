require("dotenv").config();
require("./config/mongo").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(morgan(process.env.MORGAN_MODE || "dev"));
app.use(cors());
app.use(express.json());
app.use(routes);

module.exports = app;
