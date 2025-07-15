const express = require("express");
const {
  CreateDisease,
  getAllDiseases,
  deleteDisease,
} = require("../controllers/diseaseController");
const router = express.Router();

// POST a disease
router.post("/", CreateDisease);

// GET all disease
router.get("/", getAllDiseases);

// DELETE a disease
router.delete("/", deleteDisease);

module.exports = router;
