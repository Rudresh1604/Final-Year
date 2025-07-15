const Doctor = require("../model/doctorSchema");

exports.addDoctor = async (req, res) => {
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

exports.addDoctorSlot = async (req,res) => {
  const {doctorId,day,from,to,} = req.body;
  if(!doctorId || !day || !from || !to){
    return res.status(400).json({
      success: false,
      message: "Fields doctorId, day, from, and to are required.please enter them",
    });
  }
  try {
    const doctor=Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found." });
    }
    //duplicate slot
    const duplicate = doctor.availableSlots.find(
      (slot) => slot.day === day && slot.from === from && slot.to === to
    );
    if (duplicate) {
      return res.status(400).json({ success: false, message: "Slot already exists." });
    }
    doctor.availableSlots.push({day,from,to});
    await doctor.save();

    return res.status(200).json({
      success: true,
      message: "Slot added successfully.",
      slots: doctor.availableSlots,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}