const Patient = require("../model/patientSchema");

const createPatient = async (req, res) => {
  const { name, email, phone, gender, password, bloodGroup, age, address } =
    req.body;
  console.log(req.body);

  try {
    const patient = await Patient.create({
      name: name,
      email: email,
      phone: phone,
      password: password,
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
    return res.json(
      { success: true, message: "Created Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return res.json(
      { success: true, message: "Created Successfully" },
      { status: 200 }
    );
  }
};

const deletePatient = async (req, res) => {
  const { _id } = req.body;
  console.log(req.body);
  try {
    const patient = await Patient.findById(_id);
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

module.exports = { createPatient, deletePatient };
