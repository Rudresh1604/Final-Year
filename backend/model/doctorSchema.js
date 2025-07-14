const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  age: Number,
  specialization: String,
  experience: Number, // in years
  location: {
    city: String,
    state: String,
    coordinates: {
      lat: Number,
      long: Number,
    },
  },
  availableSlots: [
    {
      day: String, // e.g., "Monday"
      from: String, // "09:00"
      to: String, // "13:00"
    },
  ],
  appointments: [{ type: mongoose.Schema.Types, ref: "Appointment" }],
  patients: [{ type: mongoose.Schema.Types, ref: "Patient" }],
  createdAt: Date,
  updatedAt: Date,
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
