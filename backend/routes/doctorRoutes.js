const express = require("express");
const { addDoctor, addDoctorSlot } = require("../controllers/doctorController");
const router = express.Router();

router.post("/", addDoctor);
router.post("/slots", addDoctorSlot);

module.exports = router;
