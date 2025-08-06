import React from "react";
import AppointmentPicker from "../components/Appointment/AppointmentPicker";
import DoctorIntro from "../components/DoctorIntro";

const Appointment = () => {
  return (
    <div className="flex flex-col max-w-screen h-full">
      <DoctorIntro />
      <AppointmentPicker />
    </div>
  );
};

export default Appointment;
