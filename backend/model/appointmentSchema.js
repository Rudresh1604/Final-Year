const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientId: ObjectId, // ref to Patient
  doctorId: { type: mongoose.Schema.Types, ref: "doctor" }, // ref to Doctor
  date: Date,
  time: String, // "14:30"
  status: { type: String, enum: ["Scheduled", "Completed", "Cancelled"] },
  reason: String,
  medicine: [{ name: String, dosage: String, duration: String }],
  prescription: String, // or a prescriptionId if separate
  createdAt: Date,
  updatedAt: Date,
});

const appointment = mongoose.model("appointment", appointmentSchema);
module.exports = appointment;
