const express = require("express");
const {
    createReport,
    deleteReport,
} = require("../controllers/reportController");

const reportRoutes = express.Router();
reportRoutes.post("/add", createReport);
reportRoutes.delete("/delete/:id", deleteReport);

module.exports = reportRoutes;