const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
  name: "String",
});

module.exports = mongoose.model("Place", PlaceSchema);
