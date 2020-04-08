const mongoose = require("mongoose");

const ExtractionSchema = new mongoose.Schema(
  {
    totalCases: Number,
    totalDeaths: Number,
    totalRecovered: Number,
    totalTests: Number,
    activeCases: Number,
    criticalCases: Number,
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Extraction", ExtractionSchema);
