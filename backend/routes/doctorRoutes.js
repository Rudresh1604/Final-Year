const express = require("express");
const { addDoctor, addDoctorSlot, getDoctorById, getDoctors, updateDoctor ,deleteDoctor} = require("../controllers/doctorController");
const auth = require("../middleware/auth");
const doctorRoutes = express.Router();

// add Doctor
doctorRoutes.post("/add", addDoctor);

// add slot
doctorRoutes.post("/slots", addDoctorSlot);

// get Doctor by id
doctorRoutes.get("/:id",auth, getDoctorById);

// get Doctors
doctorRoutes.get("/",getDoctors)

// update Doctor
doctorRoutes.put("/update/:id",auth,updateDoctor)

// delete Doctor
doctorRoutes.delete("/delete/:id",auth,deleteDoctor)

module.exports = doctorRoutes;
