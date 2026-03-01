import React from "react";

const AppointmentHeader = ({ appointment }) => {
  const formatDate = (date) => {
    new Date(date).toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const statusStyles = {
    Scheduled: "bg-green-100 text-green-600",
    Completed: "bg-purple-100 text-purple-600",
    Cancelled: "bg-red-100 text-red-600",
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Appointment Details
        </h2>
        <p className=" text-gray-500 mt-1">{formatDate(appointment.time)}</p>
      </div>
      <span
        className={`px-4 py-1 rounded-full text-sm font-medium ${statusStyles[appointment.status]}`}
      >
        {appointment.status}
      </span>
    </div>
  );
};

export default AppointmentHeader;
