const express = require("express");

const PlaceController = require("./controllers/PlaceController");

const routes = express.Router();

routes.get("/places", PlaceController.index);

module.exports = routes;
