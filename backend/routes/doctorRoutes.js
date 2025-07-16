const express = require("express");
const { addDoctor, addDoctorSlot, getDoctorById, getDoctors, updateDoctor } = require("../controllers/doctorController");
const doctorRoutes = express.Router();

doctorRoutes.post("/add", addDoctor);
doctorRoutes.post("/slots", addDoctorSlot);
doctorRoutes.get("/:id",getDoctorById);
doctorRoutes.get("/",getDoctors)
doctorRoutes.put("/update/:id",updateDoctor)


module.exports = doctorRoutes;
