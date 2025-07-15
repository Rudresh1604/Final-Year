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
