const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const moment = require("moment");

const bookAppointment = async (req, res) => {
  try {
    const { doctorId, patientId, date, time, reason } = req.body;
    const appointmentDate = moment(date, "YYYY-MM-DD");
    const startTime = moment(time, "HH:mm");
    const endTime = startTime.clone().add(30, "minutes"); // 30 min slot

    // Validate doctor & patient existence
    const doctor = await Doctor.findById(doctorId);
    const patient = await Patient.findById(patientId);
    if (!doctor || !patient) {
      return res.status(404).json({ message: "Doctor or Patient not found" });
    }

    // Check if doctor is available on that day
    const dayOfWeek = appointmentDate.format("dddd"); // e.g., "Monday"
    const availableSlot = doctor.availableSlots.find(
      (slot) => slot.day === dayOfWeek
    );

    if (!availableSlot) {
      return res
        .status(400)
        .json({ message: "Doctor not available on this day" });
    }

    const slotFrom = moment(availableSlot.from, "HH:mm");
    const slotTo = moment(availableSlot.to, "HH:mm");

    if (startTime.isBefore(slotFrom) || endTime.isAfter(slotTo)) {
      return res
        .status(400)
        .json({ message: "Time outside doctor's availability" });
    }

    // Check if doctor has a conflicting appointment at that time
    const existingAppointment = await Appointment.findOne({
      doctorId,
      date: appointmentDate.toDate(),
      time: time,
      status: { $in: ["Scheduled", "Completed"] },
    });

    if (existingAppointment) {
      return res.status(409).json({ message: "Time slot already booked" });
    }

    // Create appointment
    const newAppointment = new Appointment({
      doctorId,
      patientId,
      date: appointmentDate.toDate(),
      time,
      endTime: endTime.format("HH:mm"),
      status: "Scheduled",
      reason,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newAppointment.save();

    // Update doctor & patient documents
    doctor.appointments.push(newAppointment._id);
    doctor.patients.addToSet(patientId); // add only if not already present
    patient.updatedAt = new Date();

    await doctor.save();
    await patient.save();

    return res.status(201).json({
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { bookAppointment };
