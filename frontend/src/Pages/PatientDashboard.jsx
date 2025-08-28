import React from "react";
import PatientAppointments from "../components/PatientDashboard/PatientAppointments";

const PatientDashboard = () => {
  return (
    <div className="flex flex-row items-center border border-gray-200 rounded-2xl w-full bg-gray-50 p-3">
      <div className="flex flex-col items-center w-full">
        <PatientAppointments />
      </div>
    </div>
  );
};

export default PatientDashboard;
