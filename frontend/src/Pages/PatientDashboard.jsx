import React from "react";
import PatientAppointments from "../components/PatientDashboard/PatientAppointments";
import HeaderCard from "../components/DoctorDashboard/HeaderCard";
import { Activity, Calendar, FileText, History, Hourglass, Users } from "lucide-react/dist/cjs/lucide-react";

const patientCards = [
  {
    number: "12",
    description: "Total number of Upcoming Appointments",
    icon: Calendar,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    number: "45",
    description: "Total number of all the past Appointments",
    icon: History,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    number: "8",
    description: "Total numbers of available medical Records",
    icon: FileText,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
];
const PatientDashboard = () => {
  return (
    <div className="flex flex-col md:px-3 lg:px-5 rounded-2xl">
      <div className="my-2 mt-7 lg:my-5 mx-3 lg:mx-5">
        <h1 className="text-2xl lg:text-3xl font-semibold text-gray-600">
          Welcome,Patient
        </h1>
        <p>
          Here's a summary of your health journey.
        </p>
      </div>
      <HeaderCard cards={patientCards} />
      <div className="flex flex-col items-center w-full">
        <PatientAppointments />
      </div>
    </div>
  );
};

export default PatientDashboard;
