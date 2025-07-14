const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types, ref: "Patient" },
  doctorId: { type: mongoose.Schema.Types, ref: "Doctor" },
  date: Date,
  time: String,
  status: { type: String, enum: ["Scheduled", "Completed", "Cancelled"] },
  reason: String,
  medicine: [{ name: String, dosage: String, duration: String }],
  prescription: String,
  createdAt: Date,
  updatedAt: Date,
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
