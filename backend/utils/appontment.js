const moment = require("moment");

export const getAvailableSlot = (doctorTime, appointments, requestedTime) => {
  try {
    const format = "HH:mm";
    const docFrom = moment(doctorTime.from, format);
    const docTo = moment(doctorTime.to, format);
    const reqTime = moment(requestedTime, format);
    const slotDuration = 30; // in minutes

    // Check if requested time is within doctor’s available time
    if (
      reqTime.isBefore(docFrom) ||
      reqTime.clone().add(slotDuration, "minutes").isAfter(docTo)
    ) {
      return {
        status: false,
        message: "Doctor not available at this time.",
      };
    }

    // Check if requestedTime already booked
    const isBooked = appointments.some((time) =>
      moment(time, format).isSame(reqTime)
    );

    if (isBooked) {
      return {
        status: false,
        message: "Slot already booked. Choose another time.",
      };
    }

    // If valid slot
    return {
      status: true,
      message: "Appointment booked successfully.",
      slot: {
        start: reqTime.format(format),
        end: reqTime.clone().add(slotDuration, "minutes").format(format),
      },
    };
  } catch (error) {
    return {
      status: false,
      message: "Something went wrong.",
      error: error.message,
    };
  }
};
