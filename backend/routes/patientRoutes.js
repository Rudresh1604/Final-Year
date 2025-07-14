const express = require("express");
const { createPatient } = require("../controllers/patientController");
const router = express.Router();

router.route("/create-patient").post(createPatient);
module.exports = router;
