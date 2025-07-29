const express = require("express");
const {
  addDoctor,
  addDoctorSlot,
  getDoctorById,
  getDoctors,
  updateDoctor,
  deleteDoctor,
  updateDoctorSlot,
} = require("../controllers/doctorController");
const doctorRoutes = express.Router();

// add Doctor
doctorRoutes.post("/add", addDoctor);

// add slot
doctorRoutes.post("/slots", addDoctorSlot);

// update slot
doctorRoutes.put("/slots", updateDoctorSlot);

// get Doctor by id
doctorRoutes.get("/:id", getDoctorById);

// get Doctors
doctorRoutes.get("/", getDoctors);

// update Doctor
doctorRoutes.put("/update/:id", updateDoctor);

// delete Doctor
doctorRoutes.delete("/delete/:id", deleteDoctor);

module.exports = doctorRoutes;
