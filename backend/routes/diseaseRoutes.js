const express = require("express");
const {
  CreateDisease,
  getAllDiseases,
  deleteDisease,
} = require("../controllers/diseaseController");
const router = express.Router();

// POST /diseases
router.post("/diseases", CreateDisease);

// GET /diseases
router.get("/diseases", getAllDiseases);

// DELETE /diseases/:id
router.delete("/diseases/:id", deleteDisease);

module.exports = router;