const mongoose = require("mongoose");
const Doctor = require("../model/doctorSchema");

// add Doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      age,
      specialization,
      experience,
      password,
      location,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !age ||
      !specialization ||
      !experience ||
      !password ||
      !location
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const doctor = await Doctor.create({
      name,
      email,
      phone,
      age,
      specialization,
      experience,
      password,
      location,
    });
    return res.status(201).json({ success: true, doctor });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// add slot
const addDoctorSlot = async (req, res) => {
  try {
    const { doctorId, day, from, to } = req.body;

    if (!doctorId || !day || !from || !to) {
      return res.status(400).json({
        success: false,
        message:
          "Fields doctorId, day, from, and to are required.please enter them",
      });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found." });
    }
    //duplicate slot
    const duplicate = doctor.availableSlots.find(
      (slot) => (slot.day === day && slot.from === from) || slot.to === to
    );
    if (duplicate) {
      return res
        .status(400)
        .json({ success: false, message: "Slot already alloted." });
    }
    doctor.availableSlots.push({ day, from, to });
    await doctor.save();

    return res.status(200).json({
      success: true,
      message: "Slot added successfully.",
      slots: doctor.availableSlots,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// get Doctor by id
const getDoctorById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    return res.status(200).json({ success: true, doctor });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// get all doctors
const getDoctors = async (req, res) => {
  try {
    const { specialization, experience, city, state } = req.query;
    const query = {};
    if (specialization) {
      query.specialization = { $in: [specialization.toUpperCase()] };
    }
    if (experience) {
      query.experience = { $gte: Number(experience) };
    }
    if (city) {
      query["location.city"] = city;
    }
    if (state) {
      query["location.state"] = state;
    }

    const doctors = await Doctor.find(query);

    return res.status(200).json({ success: true, doctors });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// update Doctor
const updateDoctor = async (req, res) => {
  try {
    const id=req.params.id
    const updatedData = req.body;
    if (!id || !updatedData) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }
    const doctor = await Doctor.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    return res.status(200).json({ success: true, doctor });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// delete Doctor
const deleteDoctor=async(req,res)=>{
  try {
    const id=req.params.id;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }
    const doctor = await Doctor.findByIdAndDelete(id);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    return res.status(200).json({ success: true, message:"Deleted Successfully"});
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports={addDoctor,addDoctorSlot,getDoctorById,getDoctors,updateDoctor,deleteDoctor}