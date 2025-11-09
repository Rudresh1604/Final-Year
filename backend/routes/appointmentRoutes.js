const {
  bookAppointment,
  cancelAppointment,
  getAppointmentById,
  getAppointmentsforthatday,
} = require("../controllers/appointmentController");

const express = require("express");
const router = express.Router();

router.post("/book", bookAppointment);
router.delete("/cancel/:id", cancelAppointment);
router.get("/thatDay",getAppointmentsforthatday);
router.get("/:id", getAppointmentById);

module.exports = router;
