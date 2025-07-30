const { mongoose } = require("mongoose");
const Report = require("../model/reportSchema");
// Create a report
const createReport = async (req, res) => {
  try {
    const { appointmentId, patientId, doctorId, medicines, notes } = req.body;

    if (!appointmentId || !patientId || !doctorId) {
      return res.status(400).json({
        success: false,
        message: "appointmentId, patientId, and doctorId are required.",
      });
    }

    if (!Array.isArray(medicines) || medicines.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "At least one medicine must be provided. and medicines must be an array.",
      });
    }

    for (let med of medicines) {
      if (!med.name || !med.dosage || !med.duration) {
        return res.status(400).json({
          success: false,
          message: "Each medicine must include name, dosage, and duration.",
        });
      }
    }

    const report = await Report.create({
      appointmentId,
      patientId,
      doctorId,
      medicines,
      notes,
    });

    return res.status(201).json({ success: true, report });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a report
const deleteReport = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }
    const report = await Report.findByIdAndDelete(id);
    if (!report) {
      return res
        .status(404)
        .json({ success: false, message: "Report not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Report deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
module.exports = { createReport, deleteReport };
