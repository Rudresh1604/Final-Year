const {
  bookAppointment,
  cancelAppointment,
  getAppointmentById,
  getAvailableSlots,
  getAppointmentsforthatday,
  getAppointments,
  getStreamToken,
} = require("../controllers/appointmentController");

const express = require("express");
const router = express.Router();

router.post("/book", bookAppointment);
router.get("/available-slots", getAvailableSlots);
router.delete("/cancel/:id", cancelAppointment);
router.get("/day", getAppointmentsforthatday);
router.get("/all", getAppointments);
router.get("/:id", getAppointmentById);
router.get("/stream/token/:userId", getStreamToken);

module.exports = router;
