import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { allAppointment } from "../../Constants/Doctor";
import AllAppointment from "../components/DoctorDashboard/AllAppointment";
import AppointmentCalendar from "../components/DoctorDashboard/Calender/AppointmentCalender";
import HeaderCard from "../components/DoctorDashboard/HeaderCard";
import { ReminderComponent } from "../components/DoctorDashboard/Reminder";

const DoctorDashboard = () => {
  return (
    <div className="flex flex-col md:px-3 lg:px-5 rounded-2xl">
      <div className="my-2 mt-7 lg:my-5 mx-3 lg:mx-5">
        <h1 className="text-2xl lg:text-3xl font-semibold text-gray-600">
          Welcome,Admin
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum,
          odio?
        </p>
      </div>
      <HeaderCard />
      <div className="flex flex-col md:flex-row w-full">
        <AppointmentCalendar />
        <div>
          <ReminderComponent />
        </div>
      </div>
      <AllAppointment />
    </div>
  );
};

export default DoctorDashboard;
