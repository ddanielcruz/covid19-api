const moment = require("moment");

const Extraction = require("../models/Extraction");

const fetchExtractionsByDate = async (date) => {
  const extractions = await Extraction.find({
    createdAt: {
      $gte: date.startOf("day").toDate(),
      $lte: moment(date).endOf("day").toDate(),
    },
  });

  return extractions;
};

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

exports.today = async (request, response) => {
  const extractions = await fetchExtractionsByDate(moment());

  response.header("X-Total-Count", extractions.length);
  return response.json(extractions);
};

exports.byDate = async (request, response) => {
  const { parsedDate } = request.params;
  const extractions = await fetchExtractionsByDate(parsedDate);

  response.header("X-Total-Count", extractions.length);
  return response.json(extractions);
};
