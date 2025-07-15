const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    medicines: [
      {
        name: String,
        dosage: String,
        duration: String,
      },
    ],
    notes: String,
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
