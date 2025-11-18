const { mongoose } = require("mongoose");
const Patient = require("../model/patientSchema");
const bcrypt = require("bcryptjs");

const createPatient = async (req, res) => {
  const { name, email, phone, gender, password, bloodGroup, age, address } =
    req.body;
  console.log(req.body);

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const patient = await Patient.create({
      name: name,
      email: email,
      phone: phone,
      password: hashedPassword,
      bloodGroup: bloodGroup,
      address: address,
      gender: gender,
      age: age,
    });
    if (!patient) {
      return res.json(
        { success: false, message: "Failed, Try again later!" },
        { status: 500 }
      );
    }
    console.log(patient);

    return res.json(
      { success: true, message: "Created Successfully", id: patient._id },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return res.json({ success: true, message: error.message }, { status: 500 });
  }
};

const getPatientById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const patient = await Patient.findById(id)
      .select("-password")

      .populate({
        path: "appointments",
        populate: {
          path: "doctorId",
          select: "name email specialization _id",
        },
      });

    if (!patient) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }
    return res.status(200).json({ success: true, patient });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const deletePatient = async (req, res) => {
  const _id = req.params.id;
  console.log(req.body);
  try {
    const patient = await Patient.findByIdAndDelete(_id);
    if (!patient) {
      return res.json(
        { success: false, message: "Failed, Try again later!" },
        { status: 500 }
      );
    }
    return res.json(
      { success: true, message: "Patient Deleted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return res.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};

const updatePatient = async (req, res) => {
  try {
    const id = req.params.id;
    const { medicalHistory, ...otherData } = req.body;

    if (!id || !req.body) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    // Build update query
    let updateQuery = { $set: { ...otherData } };

    if (medicalHistory) {
      updateQuery.$push = { medicalHistory };
    }

    const patient = await Patient.findByIdAndUpdate(id, updateQuery, {
      new: true,
    })
      .select("-password")
      .populate("medicalHistory.diseaseId");

    if (!patient) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }

    return res.status(200).json({ success: true, patient });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getPatientFullSummary = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const patient = await Patient.findById(id).populate({
      path: "medicalHistory.diseaseId",
      select: "name description precautions medication workflow notes symptoms",
    });

    if (!patient) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Full patient summary fetched successfully",
      patient,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createPatient,
  deletePatient,
  updatePatient,
  getPatientById,
  getPatientFullSummary,
};
