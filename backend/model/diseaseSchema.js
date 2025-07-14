const mongoose = require("mongoose");

const diseaseSchema = new mongoose.Schema({
  name: String,
  symptoms: [String],
  spreadLevel: { type: String, enum: ["Low", "Moderate", "High"] },
  affectedRegions: [
    {
      city: String,
      state: String,
      country: String,
      coordinates: {
        lat: Number,
        long: Number,
      },
      caseCount: Number,
      lastUpdated: Date,
    },
  ],
  createdAt: Date,
  updatedAt: Date,
});

const disease = mongoose.model("disease", diseaseSchema);
module.exports = disease;
