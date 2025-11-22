const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, lowercase: true },
    password: { type: String, required: true, minLength: 8 },
    phone: String,
    age: { type: Number, required: true, min: 18, max: 100 },
    specialization: [String],
    experience: { type: Number, min: 0, max: 100 },
    gender: { type: String, enum: ["Male", "Female", "Others"] },
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
    profilePicture: String,
    availableSlots: [
      {
        day: String,
        from: String,
        to: String,
      },
    ],
    appointments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
    ],
    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patient" }],
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
