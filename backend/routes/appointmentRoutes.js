const {
  bookAppointment,
  cancelAppointment,
  getAppointmentById,
} = require("../controllers/appointmentController");

const express = require("express");
const router = express.Router();

router.post("/book", bookAppointment);
router.delete("/cancel/:id", cancelAppointment);
router.get("/:id", getAppointmentById);

module.exports = router;
