const { bookAppointment, cancelAppointment } = require("../controllers/appointmentController");

const express = require("express");
const router = express.Router();

router.post("/book", bookAppointment);
router.put("/cancel/:id",cancelAppointment);

module.exports = router;
