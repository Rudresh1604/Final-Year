const express = require("express");
const {
  createPatient,
  deletePatient,
  updatePatient,
  getPatientById,
  getPatientFullSummary,
} = require("../controllers/patientController");
const { upload } = require("../middleware/uploads");
const router = express.Router();

// Create patient
router.post("/add", upload.single("profile"), createPatient);

// Update patient
router.put("/:id", upload.single("profile"), updatePatient);

// Delete patient
router.delete("/:id", deletePatient);

// Get one patient
router.get("/:id", getPatientById);

// Extra summary
router.get("/summary/:id", getPatientFullSummary);

module.exports = router;
