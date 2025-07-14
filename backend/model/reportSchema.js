const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  appointmentId: { type: mongoose.Schema.Types, ref: "Appointment" },
  patientId: { type: mongoose.Schema.Types, ref: "Patient" },
  doctorId: { type: mongoose.Schema.Types, ref: "Doctor" },
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

const report = mongoose.model("Report", reportSchema);
module.exports = report;
