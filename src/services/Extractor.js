const cheerio = require("cheerio");
const axios = require("axios").default;

const url = "https://www.worldometers.info/coronavirus";

const fetch = async () => {
  const { data } = await axios.get(url);
  return cheerio.load(data);
};

const parseNumber = (value) => {
  return parseInt(value.replace(/,/g, ""));
};

const summarize = (extractions) => {
  const world = extractions.reduce(
    (acc, curr) => {
      acc.totalCases += curr.totalCases;
      acc.totalDeaths += curr.totalDeaths;
      acc.totalRecovered += curr.totalRecovered;
      acc.totalTests += curr.totalTests;
      acc.activeCases += curr.activeCases;
      acc.criticalCases += curr.criticalCases;
      return acc;
    },
    {
      place: "World",
      totalCases: 0,
      totalDeaths: 0,
      totalRecovered: 0,
      totalTests: 0,
      activeCases: 0,
      criticalCases: 0,
    }
  );

  return world;
};

exports.extract = async () => {
  const $ = await fetch();

  // Fetch rows including countries, territories and conveyances
  const rows = $("#main_table_countries_today tbody")
    .first()
    .find("tr")
    .slice(1);

  // Map rows to extraction items
  const mappedRows = rows.map((idx, row) => {
    const cells = $(row)
      .find("td")
      .map((idx, cell) => $(cell).text())
      .get();

    return {
      place: cells[0],
      totalCases: parseNumber(cells[1]) || 0,
      totalDeaths: parseNumber(cells[3]) || 0,
      totalRecovered: parseNumber(cells[5]) || 0,
      totalTests: parseNumber(cells[10]) || 0,
      activeCases: parseNumber(cells[6]) || 0,
      criticalCases: parseNumber(cells[7]) || 0,
    };
  });

  const extractions = mappedRows.get();
  const world = summarize(extractions);

  return [world, ...extractions];
};
