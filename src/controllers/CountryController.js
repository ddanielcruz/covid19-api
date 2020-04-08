const Country = require("../models/Country");

exports.index = async (request, response) => {
  const countries = await Country.find();
  return response.json(countries);
};
