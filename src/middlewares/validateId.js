const mongoose = require("mongoose");

module.exports = (request, response, next) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ error: "Id is not valid." });
  }

  return next();
};
