const Extraction = require("../models/Extraction");

exports.index = async (request, response) => {
  const extractions = await Extraction.find();

  response.header("X-Total-Count", extractions.length);
  return response.json(extractions);
};

exports.byPlace = async (request, response) => {
  const { id } = request.params;
  const extractions = await Extraction.find({ place: id });

  response.header("X-Total-Count", extractions.length);
  return response.json(extractions);
};
