const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  appointmentId: { type: mongoose.Schema.Types, ref: "appointment" },
  patientId: { type: mongoose.Schema.Types, ref: "patient" },
  doctorId: { type: mongoose.Schema.Types, ref: "doctor" },
  medicines: [
    {
      name: String,
      dosage: String,
      duration: String,
    },
  ],
  notes: String,
  createdAt: Date,
});

const report = mongoose.model("report", reportSchema);
module.exports = report;
