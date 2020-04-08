const Extraction = require("../models/Extraction");

exports.show = async (request, response) => {
  return response.json({ ok: true });
};

exports.today = async (request, response) => {
  return response.json({ ok: true });
};
