const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    age: Number,
    specialization: [String],
    experience: Number,
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
        day: Date, 
        from: String, 
        to: String, 
      },
    ],
    // appointments: [{ type: mongoose.Schema.Types, ref: "Appointment" }],
    // patients: [{ type: mongoose.Schema.Types, ref: "Patient" }],
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
