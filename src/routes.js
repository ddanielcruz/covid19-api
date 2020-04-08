const express = require("express");

const PlaceController = require("./controllers/PlaceController");
const CaseController = require("./controllers/CaseController");
const ExtractionController = require("./controllers/ExtractionController");

const validateId = require("./middlewares/validateId");
const validateDate = require("./middlewares/validateDate");

const routes = express.Router();

routes.get("/places", PlaceController.index);
routes.get("/places/:id", validateId, PlaceController.show);

routes.get("/cases/today", CaseController.today);
routes.get("/cases/:date", validateDate(), CaseController.show);

routes.get("/extractions", ExtractionController.index);
routes.get("/extractions/today", ExtractionController.today);
routes.get("/extractions/:date", validateDate(), ExtractionController.byDate);
routes.get("/extractions/place/:id", validateId, ExtractionController.byPlace);

module.exports = routes;
