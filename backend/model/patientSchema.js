const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  gender: String,
  password: String,
  bloodGroup: String,
  age: Number,
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: String,
    coordinates: {
      lat: Number,
      long: Number,
    },
  },
  medicalHistory: [
    {
      diseaseId: { type: mongoose.Schema.Types, ref: "disease" }, // ref to Disease
      diagnosedOn: Date,
      notes: String,
    },
  ],
  aiPredictions: [],
  createdAt: Date,
  updatedAt: Date,
});

const patient = mongoose.model("patient", patientSchema);
module.exports = patient;
