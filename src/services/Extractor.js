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

exports.extract = async () => {
  const $ = await fetch();

  // Fetch rows including countries, territories and conveyances
  const rows = $("#main_table_countries_today tbody").first().find("tr");

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

  return mappedRows.get();
};
