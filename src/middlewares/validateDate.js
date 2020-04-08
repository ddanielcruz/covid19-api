const moment = require("moment");

module.exports = (format = "YYYY-MM-DD") => (request, response, next) => {
  const { date } = request.params;
  const parsedDate = moment(date, format);

  if (!parsedDate.isValid()) {
    return response.status(400).json({ error: "Date is not valid." });
  } else {
    request.params.parsedDate = parsedDate;
  }

  return next();
};
