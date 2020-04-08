const express = require("express");

const PlaceController = require("./controllers/PlaceController");

const routes = express.Router();

routes.get("/places", PlaceController.index);
routes.get("/places/:id", PlaceController.show);
routes.get("/places/:id/extractions", PlaceController.extractions);

module.exports = routes;
