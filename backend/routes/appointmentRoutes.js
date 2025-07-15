const { bookAppointment } = require("../controllers/appointmentController");

const router = require("express").Router();

router.route("/book").post(bookAppointment);
