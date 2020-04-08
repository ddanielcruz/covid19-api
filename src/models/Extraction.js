const mongoose = require("mongoose");

const ExtractionSchema = new mongoose.Schema(
  {
    totalCases: Number,
    totalDeaths: Number,
    totalRecovered: Number,
    totalTests: Number,
    activeCases: Number,
    criticalCases: Number,
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Extraction", ExtractionSchema);
