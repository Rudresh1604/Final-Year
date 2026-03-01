const Appointment = require("../model/appointmentSchema");
const Doctor = require("../model/doctorSchema");
const Patient = require("../model/patientSchema");
const Unavailability = require("../model/unavailablitySchema");
const streamClient = require("../utils/StreamClient.js");

const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

const bookAppointment = async (req, res) => {
  try {
    const { doctorId, patientId, day, time, reason } = req.body;

    const startTime = time?.from;
    const endTime = time?.to;
    const appointmentDate = day?.from;

    if (!startTime || !endTime || !appointmentDate) {
      return res.status(400).json({ message: "Invalid time or day data" });
    }

    const appointmentDateTime = moment(startTime);
    const appointmentEndTime = moment(endTime);
    const appointmentDateOnly = moment(appointmentDate).startOf("day");

    // Validate doctor & patient
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Check doctor availability
    const dayOfWeek = appointmentDateTime.format("dddd");

    const availableSlot = doctor.availableSlots.find(
      (slot) => slot.day === dayOfWeek,
    );

    if (!availableSlot) {
      return res
        .status(400)
        .json({ message: "Doctor not available on this day" });
    }

    const slotFrom = moment(availableSlot.from);
    const slotTo = moment(availableSlot.to);

    if (
      appointmentDateTime.isBefore(slotFrom) ||
      appointmentEndTime.isAfter(slotTo)
    ) {
      return res.status(400).json({
        message: "Requested time is outside doctor's available hours",
      });
    }

    // Check appointment conflict
    const existingAppointment = await Appointment.findOne({
      doctorId,
      status: { $in: ["Scheduled"] },
      $or: [
        {
          time: { $lt: appointmentEndTime.toDate() },
          endTime: { $gt: appointmentDateTime.toDate() },
        },
      ],
    });

    if (existingAppointment) {
      return res.status(409).json({ message: "Time slot already booked" });
    }

    /*
      ==============================
      STREAM VIDEO CALL CREATION
      ==============================
    */
    // Create stream users first
    await streamClient.upsertUsers([
      {
        id: doctorId.toString(),
        name: doctor.name,
      },
      {
        id: patientId.toString(),
        name: patient.name,
      },
    ]);

    // Create video call
    const callId = uuidv4();
    const call = streamClient.video.call("default", callId);

    await call.create({
      data: {
        created_by_id: patientId.toString(),
        members: [
          { user_id: doctorId.toString() },
          { user_id: patientId.toString() },
        ],
        starts_at: appointmentDateTime.toISOString(),
      },
    });

    const meetLink = `https://localhost:5173/meet/${callId}`;

    /*
      ==============================
      CREATE APPOINTMENT
      ==============================
    */

    const newAppointment = new Appointment({
      doctorId,
      patientId,
      date: appointmentDateOnly.toDate(),
      time: appointmentDateTime.toDate(),
      endTime: appointmentEndTime.toDate(),
      status: "Scheduled",
      reason,
      meetLink: meetLink,
      callId: callId,
    });

    await newAppointment.save();

    // Update doctor & patient
    doctor.appointments.push(newAppointment._id);
    doctor.patients.addToSet(patientId);
    await doctor.save();

    patient.appointments.push(newAppointment._id);
    await patient.save();

    return res.status(201).json({
      message: "Appointment booked successfully",
      appointment: newAppointment,
      meetLink,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);

    return res.status(500).json({
      message: error?.message || "Internal server error",
    });
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

const getAvailableSlots = async (req, res) => {
  try {
    const { doctorId, date } = req.query;

    if (!doctorId || !date) {
      return res
        .status(400)
        .json({ message: "Doctor ID and date are required" });
    }

    // 1. Validate doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const requestedDate = moment(date);
    const dayOfWeek = requestedDate.format("dddd");

    // 2. Get doctor's working hours for that day
    const availableSlot = doctor.availableSlots.find(
      (slot) => slot.day === dayOfWeek,
    );

    if (!availableSlot) {
      return res.status(200).json({
        date: requestedDate.format("YYYY-MM-DD"),
        availableSlots: [],
      });
    }

    // 3. Parse working hours
    const slotStart = moment(availableSlot.from);
    const slotEnd = moment(availableSlot.to);

    const workDayStart = requestedDate
      .clone()
      .hour(slotStart.hour())
      .minute(slotStart.minute())
      .second(0);

    const workDayEnd = requestedDate
      .clone()
      .hour(slotEnd.hour())
      .minute(slotEnd.minute())
      .second(0);

    // 4. Get all unavailability for this doctor on this date
    const startOfDay = requestedDate.clone().startOf("day").toDate();
    const endOfDay = requestedDate.clone().endOf("day").toDate();

    const unavailabilities = await Unavailability.find({
      doctorId,
      isActive: true,
      $or: [
        // Single day unavailability
        {
          startTime: { $gte: startOfDay, $lt: endOfDay },
        },
        // Multi-day unavailability that overlaps with requested day
        {
          startTime: { $lte: startOfDay },
          endTime: { $gt: startOfDay },
        },
        // Recurring unavailability
        {
          recurring: true,
          recurringDays: dayOfWeek,
          $or: [
            { recurringEndDate: { $gte: startOfDay } },
            { recurringEndDate: null },
          ],
        },
      ],
    });

    // 5. Get existing appointments
    const existingAppointments = await Appointment.find({
      doctorId,
      status: "Scheduled",
      time: { $gte: startOfDay, $lt: endOfDay },
    }).select("time endTime");

    // 6. Generate all possible slots
    const allSlots = [];
    const currentTime = workDayStart.clone();
    const appointmentDuration = 30; // minutes

    while (currentTime < workDayEnd) {
      const slotEndTime = currentTime
        .clone()
        .add(appointmentDuration, "minutes");

      if (slotEndTime <= workDayEnd) {
        allSlots.push({
          start: currentTime.toISOString(),
          end: slotEndTime.toISOString(),
          available: true,
        });
      }

      currentTime.add(appointmentDuration, "minutes");
    }

    // 7. Apply unavailability filters
    const filteredSlots = allSlots.map((slot) => {
      const slotStart = moment(slot.start);
      const slotEnd = moment(slot.end);

      // Check if slot conflicts with any unavailability
      const isUnavailable = unavailabilities.some((unavail) => {
        let unavailStart, unavailEnd;

        if (unavail.recurring) {
          // For recurring, use time from the requested date
          const timeStart = moment(unavail.startTime)
            .format("HH:mm")
            .split(":");
          const timeEnd = moment(unavail.endTime).format("HH:mm").split(":");

          unavailStart = requestedDate
            .clone()
            .hour(parseInt(timeStart[0]))
            .minute(parseInt(timeStart[1]))
            .second(0);

          unavailEnd = requestedDate
            .clone()
            .hour(parseInt(timeEnd[0]))
            .minute(parseInt(timeEnd[1]))
            .second(0);
        } else {
          unavailStart = moment(unavail.startTime);
          unavailEnd = moment(unavail.endTime);
        }

        return slotStart < unavailEnd && slotEnd > unavailStart;
      });

      // Check if slot conflicts with booked appointments
      const isBooked = existingAppointments.some((appointment) => {
        const appointmentStart = moment(appointment.time);
        const appointmentEnd = moment(appointment.endTime);

        return slotStart < appointmentEnd && slotEnd > appointmentStart;
      });

      return {
        ...slot,
        available: !isUnavailable && !isBooked,
      };
    });

    res.status(200).json({
      date: requestedDate.format("YYYY-MM-DD"),
      dayOfWeek,
      availableSlots: filteredSlots,
      workDayStart: workDayStart.toISOString(),
      workDayEnd: workDayEnd.toISOString(),
      totalSlots: filteredSlots.length,
      availableCount: filteredSlots.filter((slot) => slot.available).length,
    });
  } catch (error) {
    console.error("Error fetching available slots:", error);
    res.status(500).json({ message: "Internal server error" });
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
    const { date } = req.query; // Expect: /thatDay?date=2025-02-18
    const { id } = req.user;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const d = new Date(date); // Convert input → Date object

    const start = new Date(
      Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0),
    );
    const end = new Date(
      Date.UTC(
        d.getUTCFullYear(),
        d.getUTCMonth(),
        d.getUTCDate(),
        23,
        59,
        59,
        999,
      ),
    );

    const appointments = await Appointment.find({
      time: { $gte: start, $lte: end },
      $or: [{ doctorId: id }, { patientId: id }],
    })
      .populate("patientId", "name")
      .populate("doctorId", "name specialization");

    return res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
      message: "Appointments fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching appointments for date:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// get appointment by doctor or patient id
const getAppointments = async (req, res) => {
  try {
    const { id } = req.user;

    if (!id) {
      return res.status(500).json({ message: "Invalid Appointment" });
    }

    const appointments = await Appointment.find({
      $or: [{ doctorId: id }, { patientId: id }],
    })
      .populate("patientId", "name ")
      .populate("doctorId", "name specialization");

    if (!appointments) {
      return res.status(404).json({ message: "Appointments not available" });
    }

    return res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
      message: "Appointments fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching appointments for date:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  bookAppointment,
  cancelAppointment,
  getAppointmentById,
  getAvailableSlots,
  getAppointmentsforthatday,
  getAppointments,
};
