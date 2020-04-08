const _ = require("lodash");

const Place = require("../models/Place");
const Extraction = require("../models/Extraction");

exports.index = async (request, response) => {
  const places = await Place.find();
  return response.json(places);
};

exports.show = async (request, response) => {
  const { id } = request.params;
  const place = await Place.findById(id);

  if (!place) {
    return response.status(404).json({ error: "Place not found." });
  }

  // Fetch and convert last extraction
  let lastExtraction = await Extraction.findOne({ place: id }).sort({
    _id: -1,
  });
  lastExtraction = _.omit(lastExtraction.toJSON(), ["updatedAt", "place"]);

  return response.json({
    ...place.toJSON(),
    lastExtraction,
  });
};
