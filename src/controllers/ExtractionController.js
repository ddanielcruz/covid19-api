const Extraction = require("../models/Extraction");

exports.index = async (request, response) => {
  return response.json({ ok: true });
};

exports.byPlace = async (request, response) => {
  return response.json({ ok: true });
};
