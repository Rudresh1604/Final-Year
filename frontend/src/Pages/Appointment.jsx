import React, { useEffect } from "react";
import AppointmentPicker from "../components/Appointment/AppointmentPicker";
import DoctorIntro from "../components/Appointment/DoctorIntro";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { rootSlice } from "../redux/rootSlice";

const Appointment = () => {
  const selector = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
    }
    console.log(selector);
  }, [selector]);
  return (
    <div className="flex flex-col max-w-screen h-full">
      <ToastContainer />
      <DoctorIntro />
      <AppointmentPicker
        doctorId={"68888e0e7729dff42801add2"}
        patientDetails={selector}
      />
    </div>
  );
};

export default Appointment;
