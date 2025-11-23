import React from "react";
import { formatDateDisplay, formatTime } from "../../utils/utils";
import { Calendar, Clock } from "lucide-react";
import AppointmentStatusButton from "../Appointment/AppointmentStatus";

const AppointmentCards = ({
  name,
  speciality,
  dateTime = "",
  isAppointment,
  isPatientView,
  appointment,
}) => {
  return (
    <div className="flex rounded-lg w-full text-gray-600 justify-between items-center py-2  px-2 border-1 border-gray-200 hover:bg-gray-100 ">
      <div className="flex items-center w-full gap-2">
        <img
          className="rounded-full w-14 h-15 ml-1.5"
          src={
            isPatientView
              ? appointment?.doctorId.profilePicture ||
                "https://cdn.pixabay.com/photo/2023/02/12/13/16/dog-7785066_1280.jpg"
              : appointment?.patientId.profilePicture
          }
          alt={isPatientView ? "doctor profile" : "patient profile"}
        />
        <div className="flex flex-col w-[45%] md:flex-row md:justify-between ml-2 gap-2">
          <div>
            <h2 className="font-semibold text-lg">
              {isPatientView
                ? `Dr. ${appointment?.doctorId?.name}`
                : `${appointment?.patientId?.name}`}
            </h2>
            {isPatientView && (
              <p className="text-xs text-gray-600">
                {" "}
                {appointment?.doctorId?.specialization}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="flex items-center gap-2 text-gray-600">
              <Calendar className="text-yellow-300 w-5 h-6" />{" "}
              {formatDateDisplay(appointment?.time)}
            </h1>
            <h1 className="flex items-center gap-2 text-gray-600">
              <Clock className="text-red-400 w-5 h-6" />{" "}
              {formatTime(appointment?.time)}
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-[30%] items-center">
        <div className="flex w-full gap-2  justify-center items-center">
          Status:
          <h1 className="text-green-500 font-semibold">
            {" "}
            {appointment?.status}
          </h1>
        </div>
        <AppointmentStatusButton
          status={appointment.status}
          time={appointment.time}
          endTime={appointment.endTime}
        />
      </div>
    </div>
  );
};

export default AppointmentCards;
