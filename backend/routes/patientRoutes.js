const express = require("express");
const {
  createPatient,
  deletePatient,
  updatePatient,
  getPatientById,
} = require("../controllers/patientController");
const router = express.Router();

router.route("/add").post(createPatient);
router.route("/delete/:id").delete(deletePatient);
router.route("/update/:id").put(updatePatient);
router.route("/:id").get(getPatientById);

module.exports = router;
