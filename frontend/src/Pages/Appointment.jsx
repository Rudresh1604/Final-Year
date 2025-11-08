import React from "react";
import AppointmentPicker from "../components/Appointment/AppointmentPicker";
import DoctorIntro from "../components/Appointment/DoctorIntro";

const Appointment = () => {
  return (
    <div className="flex flex-col max-w-screen h-full">
      <DoctorIntro />
      <AppointmentPicker doctorId={"68888e0e7729dff42801add2"} />
    </div>
  );
};

export default Appointment;
