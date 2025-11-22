const mongoose = require("mongoose");
const Doctor = require("../model/doctorSchema");
const bcrypt = require("bcryptjs");
const { uploadToCloudinary } = require("../utils/cloudinaryUpload");
const { cloudinary } = require("../config/cloudinary");

// add Doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      age,
      gender,
      specialization,
      experience,
      password,
      location,
    } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    if (
      !name ||
      !email ||
      !phone ||
      !age ||
      !specialization ||
      !experience ||
      !password ||
      !location ||
      !gender
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (gender !== "Male" && gender !== "Female" && gender !== "Others") {
      return res
        .status(400)
        .json({ success: false, message: "Gender is invalid" });
    }

    const uploadResult = await uploadToCloudinary(
      req.file.buffer,
      "healthScan/doctors"
    );

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const doctor = await Doctor.create({
      name,
      email,
      phone,
      age,
      gender,
      specialization,
      experience,
      password: hashedPassword,
      location,
      profilePicture: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    });
    return res
      .status(201)
      .json({ success: true, message: "Doctor Added Successfully" });
  } catch (error) {
    // console.log(error);
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

const updateDoctorSlot = async (req, res) => {
  try {
    const { doctorId, day, from, to } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Remove old slot for the day if it exists
    doctor.availableSlots = doctor.availableSlots.filter(
      (slot) => slot.day !== day
    );

    // Push the new slot
    doctor.availableSlots.push({ day, from, to });

    await doctor.save();

    return res.status(200).json({
      message: `${day} slot updated successfully`,
      availableSlots: doctor.availableSlots,
    });
  } catch (error) {
    console.error("Error updating doctor slot:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// get Doctor by id
const getDoctorById = async (req, res) => {
  try {
    const id = req.params.doctorId;
    // console.log(id);

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const doctor = await Doctor.findById(id)
      .populate({
        path: "appointments",
        populate: {
          path: "patientId",
          select: "name profilePicture gender age _id",
        },
      })
      .populate({
        path: "patients",
        select: "name profilePicture gender phone location age _id",
      })
      .select("-password -public_id");
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    // console.log(doctor);

    return res.status(200).json({ success: true, doctor: doctor });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// get all doctors
const getDoctors = async (req, res) => {
  try {
    const { query, specialization, experience, city, state } = req.query;
    const filter = {};

    if (query && query.trim().length > 1) {
      filter.name = { $regex: query.trim(), $options: "i" };
    }

    if (specialization) {
      filter.specialization = { $in: [specialization.toUpperCase()] };
    }

    if (experience) {
      filter.experience = { $gte: Number(experience) };
    }

    if (city) {
      filter["location.city"] = { $regex: city, $options: "i" };
    }

    if (state) {
      filter["location.state"] = { $regex: state, $options: "i" };
    }

    const doctors = await Doctor.find(filter).select("-password -public_id");

    return res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// update Doctor
const updateDoctor = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || !updatedData) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const existingDoctor = await Doctor.findById(id);
    if (!existingDoctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    let updatedData = req.body;

    // If a new file is uploaded
    if (req.file) {
      // If old image exists, delete it
      if (existingDoctor.public_id) {
        await cloudinary.uploader.destroy(existingDoctor.public_id);
      }

      // Upload new image
      const uploadResult = await uploadToCloudinary(
        req.file.buffer,
        "healthScan/doctors"
      );

      updatedData.profilePicture = uploadResult.secure_url;
      updatedData.public_id = uploadResult.public_id;
    }

    // Update database
    const doctor = await Doctor.findByIdAndUpdate(id, updatedData, {
      new: true,
    }).select("-password -public_id -appointments -patients");
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
const deleteDoctor = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }
    const doctor = await Doctor.findByIdAndDelete(id);

    await cloudinary.uploader.destroy(doctor.public_id);

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// controllers/unavailabilityController.js
const createUnavailability = async (req, res) => {
  try {
    const {
      doctorId,
      type,
      title,
      startTime,
      endTime,
      recurring,
      recurringDays,
      recurringEndDate,
      reason,
    } = req.body;

    const unavailability = new Unavailability({
      doctorId,
      type,
      title,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      recurring: recurring || false,
      recurringDays: recurring ? recurringDays : [],
      recurringEndDate: recurringEndDate ? new Date(recurringEndDate) : null,
      reason,
      isActive: true,
    });

    await unavailability.save();

    res.status(201).json({
      message: "Unavailability created successfully",
      unavailability,
    });
  } catch (error) {
    console.error("Error creating unavailability:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getDoctorUnavailabilities = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { startDate, endDate } = req.query;

    let query = { doctorId, isActive: true };

    if (startDate && endDate) {
      query.$or = [
        // Single events in date range
        {
          startTime: { $gte: new Date(startDate) },
          endTime: { $lte: new Date(endDate) },
        },
        // Recurring events
        { recurring: true },
        // Events that overlap with date range
        {
          startTime: { $lte: new Date(endDate) },
          endTime: { $gte: new Date(startDate) },
        },
      ];
    }

    const unavailabilities = await Unavailability.find(query);
    res.status(200).json({ unavailabilities });
  } catch (error) {
    console.error("Error fetching unavailabilities:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addDoctor,
  addDoctorSlot,
  getDoctorById,
  getDoctors,
  updateDoctor,
  deleteDoctor,
  updateDoctorSlot,
  createUnavailability,
  getDoctorUnavailabilities,
};
