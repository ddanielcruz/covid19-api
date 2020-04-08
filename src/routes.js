const express = require("express");

const CountryController = require("./controllers/CountryController");

const routes = express.Router();

routes.get("/countries", CountryController.index);

module.exports = routes;
