const Appointment = require("../model/appointmentSchema");
const Doctor = require("../model/doctorSchema");
const Patient = require("../model/patientSchema");
const moment = require("moment");

const bookAppointment = async (req, res) => {
  try {
    const { doctorId, patientId, time, reason } = req.body;

    // No change in parsing
    const appointmentDateTime = moment(time); // already ISO
    const endTime = appointmentDateTime.clone().add(30, "minutes");

    const appointmentDateOnly = appointmentDateTime.clone().startOf("day");

    // Validate doctor & patient existence
    const doctor = await Doctor.findById(doctorId);
    const patient = await Patient.findById(patientId);
    if (!doctor || !patient) {
      return res.status(404).json({ message: "Doctor or Patient not found" });
    }

    // Check if doctor is available that day
    const dayOfWeek = appointmentDateTime.format("dddd"); // "Tuesday"
    const availableSlot = doctor.availableSlots.find(
      (slot) => slot.day === dayOfWeek
    );

    if (!availableSlot) {
      return res
        .status(400)
        .json({ message: "Doctor not available on this day" });
    }

    const slotFrom = moment(availableSlot.from); // ISO datetime
    const slotTo = moment(availableSlot.to); // ISO datetime

    if (appointmentDateTime.isBefore(slotFrom) || endTime.isAfter(slotTo)) {
      return res.status(400).json({
        message: "Requested time is outside doctor's available hours",
      });
    }

    // Check for existing appointment conflict
    const existingAppointment = await Appointment.findOne({
      doctorId,
      date: appointmentDateOnly.toDate(),
      time: appointmentDateTime.toISOString(),
      status: { $in: ["Scheduled", "Completed"] },
    });

    if (existingAppointment) {
      return res.status(409).json({ message: "Time slot already booked" });
    }

    // Create new appointment
    const newAppointment = new Appointment({
      doctorId,
      patientId,
      date: appointmentDateOnly.toDate(), // optional
      time: appointmentDateTime.toDate(), // ← as Date
      endTime: endTime.toDate(), // ← as Date
      status: "Scheduled",
      reason,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newAppointment.save();

    // Update doctor & patient
    doctor.appointments.push(newAppointment._id);
    doctor.patients.addToSet(patientId);
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
