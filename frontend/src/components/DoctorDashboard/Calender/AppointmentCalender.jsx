import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./calendar.css";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
import { assignRandomColors } from "../../../lib/assignColors";
import AddAvailableSlot from "../AddSlot/AddAvailableSlot";
import AddUnavailabilityModal from "../AddSlot/AddUnavailability";

const AppointmentCalendar = ({ doctorId }) => {
  const selector = useSelector((state) => state.auth);
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddUnavailablityModalOpen, setAddUnavailablityModalOpen] =
    useState(false);

  // Selected date in FullCalendar
  const [date, setDate] = useState(new Date());

  // Fetch appointments for that day
  const getAppointmentsForDate = async (day) => {
    try {
      const formatted = moment(day).format("YYYY-MM-DD");

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/appointment/day`,
        {
          params: { date: "2025-08-05" },
          // params: { date: formatted },
          headers: {
            Authorization: `Bearer ${selector.user.token}`,
          },
        },
      );

      const appts = response.data.appointments;

      const formattedEvents = appts.map((item) => ({
        title: item.patientId?.name || "Patient",
        start: item.time,
        end: moment(item.time).add(30, "minutes").toISOString(),
        extendedProps: {
          patient: item.patientId?.name,
          doctor: item.doctorId?.name,
        },
      }));

      const coloredEvents = assignRandomColors(formattedEvents);

      console.log(coloredEvents);

      setAppointments(coloredEvents);
    } catch (err) {
      console.log("Error fetching appointments:", err);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleUnavailablityModalClose = () => {
    setAddUnavailablityModalOpen(false);
  };

  // Fetch when component loads
  useEffect(() => {
    getAppointmentsForDate(date);
  }, [date]);

  return (
    <div className="calendar-wrapper w-full">
      <div className="calendar-box">
        <div className=" flex justify-between items-center gap-2 max-sm:flex-col">
          <h1 className="text-2xl text-gray-600 font-semibold mb-4">
            Appointments
          </h1>
          <div>
            <button
              className="ml-3 px-4 py-2 rounded-lg font-semibold text-center bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              onClick={() => setModalOpen(true)}
            >
              Add Slot
            </button>
            <button
              className="ml-3 px-4 py-2 rounded-lg font-semibold text-center bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              onClick={() => setAddUnavailablityModalOpen(true)}
            >
              Add Unavailable Slot
            </button>
          </div>
        </div>
        <div className="calendar-header">
          <h2>Today's Schedule</h2>
          <span>
            {moment(date).format("MMMM D, YYYY")}

            <AddAvailableSlot
              openModal={isModalOpen}
              doctorId={doctorId}
              handleModalClose={handleModalClose}
            />
            <AddUnavailabilityModal
              openModal={isAddUnavailablityModalOpen}
              handleModalClose={handleUnavailablityModalClose}
              doctorId={doctorId}
            />
          </span>
        </div>

        <div className="calendar-container">
          <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView="timeGridDay"
            initialDate={date}
            allDaySlot={false}
            slotMinTime="09:00:00"
            slotMaxTime="18:00:00"
            events={appointments}
            height="100%"
            nowIndicator={true}
            headerToolbar={false}
            datesSet={(info) => {
              setDate(info.start); // update date when user navigates
            }}
            slotLabelFormat={{
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }}
            eventContent={(arg) => {
              return {
                html: `
                  <div class="custom-event-content" style="background:${arg.event.backgroundColor}; color:${arg.event.textColor}">
                    <div class="event-title">${arg.event.title}</div>
                    <div class="event-doctor">${arg.event.extendedProps.patient}</div>
                  </div>
                `,
              };
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendar;
