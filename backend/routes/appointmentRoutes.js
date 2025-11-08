const {
  bookAppointment,
  cancelAppointment,
  getAppointmentById,
  getAvailableSlots,
} = require("../controllers/appointmentController");

const express = require("express");
const router = express.Router();

router.post("/book", bookAppointment);
router.get("/available-slots", getAvailableSlots);
router.delete("/cancel/:id", cancelAppointment);
router.get("/:id", getAppointmentById);

module.exports = router;
