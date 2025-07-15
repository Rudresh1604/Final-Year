const express = require("express");
const { CreateDisease } = require("../controllers/diseaseController");

const diseaseRoutes = express.Router();

diseaseRoutes.post("/add-disease", CreateDisease);

module.exports = diseaseRoutes;
