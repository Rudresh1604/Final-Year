import React, { useEffect, useState, useCallback, useRef } from "react";
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
import RenderEventContent from "./RenderEventContent";

const AppointmentCalendar = ({ doctorId }) => {
  const selector = useSelector((state) => state.auth);
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddUnavailablityModalOpen, setAddUnavailablityModalOpen] =
    useState(false);

  // Hardcode the date here - change this to whatever date you want to test
  const [date, setDate] = useState(new Date("2026-02-28"));

  const fetchingRef = useRef(false);

  // Fetch appointments for that day
  const getAppointmentsForDate = useCallback(
    async (day) => {
      if (fetchingRef.current) return;

      try {
        fetchingRef.current = true;

        const formatted = moment(day).format("YYYY-MM-DD");
        console.log("Fetching appointments for:", formatted);

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/appointment/day`,
          {
            params: { date: formatted }, // This will use your hardcoded date
            headers: {
              Authorization: `Bearer ${selector.user.token}`,
            },
          },
        );

        const appts = response.data.appointments || [];
        console.log("Raw API response:", appts);

        if (!appts || appts.length === 0) {
          console.log("No appointments found for", formatted);
          setAppointments([]);
          return;
        }

        const formattedEvents = appts
          .map((item, index) => {
            const startTime = new Date(item.time);

            if (isNaN(startTime.getTime())) {
              console.error("Invalid start time:", item.time);
              return null;
            }

            let endTime = new Date(item.endTime);

            return {
              id: item._id || `event-${index}`,
              title: item.patientId?.name || "Patient",
              start: startTime,
              end: endTime,
              extendedProps: {
                patient: item.patientId?.name || "Unknown",
                doctor: item.doctorId?.name || "Unknown",
                status: item?.status || "scheduled",
                reason: item?.reason || "",
              },
            };
          })
          .filter((event) => event !== null);

        const coloredEvents = assignRandomColors(formattedEvents);
        setAppointments(coloredEvents);
      } catch (err) {
        console.log("Error fetching appointments:", err);
      } finally {
        fetchingRef.current = false;
      }
    },
    [selector.user.token],
  );

  // Fetch when component loads
  useEffect(() => {
    getAppointmentsForDate(date);
  }, [date, getAppointmentsForDate]);

  const handleModalClose = () => {
    setModalOpen(false);
    getAppointmentsForDate(date);
  };

  const handleUnavailablityModalClose = () => {
    setAddUnavailablityModalOpen(false);
    getAppointmentsForDate(date);
  };

  const handleDateChange = (newDate) => {
    // If you want to allow date changes but still want to test specific dates,
    // you can add conditions here
    console.log("Date changed to:", newDate);
    setDate(newDate);
  };

  // Move renderEventContent inside component
  const renderEventContent = useCallback((arg) => {
    console.log(arg.event);

    return <RenderEventContent arg={arg} />;
  }, []);

  return (
    <div className="calendar-wrapper w-full">
      <div className="calendar-box">
        <div className="flex justify-between items-center gap-2 max-sm:flex-col">
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
          <span>{moment(date).format("MMMM D, YYYY")}</span>
        </div>

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

        <div
          className="calendar-container"
          style={{
            height: "600px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "10px",
            background: "white",
          }}
        >
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
              console.log("Date changed to:", info.start);
              // If you want to prevent navigation away from your test date, uncomment this:
              // if (moment(info.start).format("YYYY-MM-DD") !== moment(date).format("YYYY-MM-DD")) {
              //   return; // Ignore navigation
              // }
              handleDateChange(info.start);
            }}
            slotLabelFormat={{
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }}
            eventContent={renderEventContent}
            eventDidMount={(info) => {
              console.log("Event mounted:", info.event.title);
            }}
          />
        </div>

        {appointments.length === 0 && (
          <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
            No appointments scheduled for {moment(date).format("MMMM D, YYYY")}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCalendar;
