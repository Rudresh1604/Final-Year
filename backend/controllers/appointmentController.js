const Appointment = require("../model/appointmentSchema");
const Doctor = require("../model/doctorSchema");
const Patient = require("../model/patientSchema");
const moment = require("moment");

const bookAppointment = async (req, res) => {
  try {
    const { doctorId, patientId, time, reason } = req.body;

    const appointmentDateTime = moment(time); // full ISO datetime
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
      status: { $in: ["Scheduled"] },
      $or: [
        {
          time: { $lt: endTime.toDate() },
          endTime: { $gt: appointmentDateTime.toDate() },
        },
      ],
    });

    if (existingAppointment) {
      return res.status(409).json({ message: "Time slot already booked" });
    }

    // Create new appointment
    const newAppointment = new Appointment({
      doctorId,
      patientId,
      date: appointmentDateOnly.toDate(),
      time: appointmentDateTime.toISOString(),
      endTime: endTime.toISOString(),
      status: "Scheduled",
      reason,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newAppointment.save();

    // Update doctor & patient
    doctor.appointments.push(newAppointment._id);
    doctor.patients.addToSet(patientId);

    patient.appointments.push(newAppointment._id);

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

const cancelAppointment = async (req, res) => {
  try {
    const id = req.params.id;
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    const docId = appointment.doctorId;
    const patientId = appointment.patientId;
    const doctor = await Doctor.findById(docId);
    const patient = await Patient.findById(patientId);
    doctor.appointments.pull(id);
    patient.appointments.pull(id);
    await doctor.save();
    await patient.save();
    return res
      .status(200)
      .json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(500).json({ message: "Invalid Appointment" });
    }

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(409).json({ message: "Appointment not available" });
    }

    // Create new appointment

    return res.status(201).json({
      success: true,
      appointment,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAppointmentsforthatday = async (req, res) => {
  try {
    const { date } = req.query; 

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const d = new Date(date); 

    const start = new Date(Date.UTC(
      d.getUTCFullYear(),
      d.getUTCMonth(),
      d.getUTCDate(),
      0, 0, 0
    ));
    const end = new Date(Date.UTC(
      d.getUTCFullYear(),
      d.getUTCMonth(),
      d.getUTCDate(),
      23, 59, 59, 999
    ));

    const appointments = await Appointment.find({
      date: { $gte: start, $lte: end },
    })
      .populate("patientId")
      .populate("doctorId");

    return res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
      message: "Appointments fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching today's appointments:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { bookAppointment, cancelAppointment, getAppointmentById,getAppointmentsforthatday };
