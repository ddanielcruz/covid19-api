const moment = require("moment");

const Extraction = require("../models/Extraction");

const fetchCases = async (date) => {
  const extractions = await Extraction.find({
    createdAt: {
      $gte: date.startOf("day").toDate(),
      $lte: moment(date).endOf("day").toDate(),
    },
  }).populate("place");

  // Remove repeated extractions and keep only the most recent ones
  const mappedExtractions = extractions.reverse().reduce((acc, curr) => {
    if (!acc[curr.place.name]) {
      acc[curr.place.name] = curr;
    }

    return acc;
  }, {});

  return Object.values(mappedExtractions);
};

exports.show = async (request, response) => {
  const { parsedDate } = request.params;
  const cases = await fetchCases(parsedDate);

  response.header("X-Total-Count", cases.length);
  return response.json(cases);
};

exports.today = async (request, response) => {
  const cases = await fetchCases(moment());

  response.header("X-Total-Count", cases.length);
  return response.json(cases);
};
