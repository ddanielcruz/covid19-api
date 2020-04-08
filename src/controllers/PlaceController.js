const Place = require("../models/Place");

exports.index = async (request, response) => {
  const places = await Place.find();
  return response.json(places);
};
