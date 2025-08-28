import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./calendar.css"; // import css file
import { assignRandomColors } from "../../lib/assignColors";

const events = [
  {
    title: "Cardiology Appointment",
    start: "2025-08-28T10:00:00",
    end: "2025-08-28T11:00:00",
    extendedProps: { patient: "Dr. Orlando Diggs" },
  },
  {
    title: "Follow-up",
    start: "2025-08-28T11:00:00",
    end: "2025-08-28T12:00:00",
    extendedProps: { patient: "Dr. Natali Craig" },
  },
  {
    title: "Physical Therapy",
    start: "2025-08-28T14:00:00",
    end: "2025-08-28T15:00:00",
    extendedProps: { patient: "Dr. Sarah Wilson" },
  },
  {
    title: "Checkup",
    start: "2025-08-28T15:30:00",
    end: "2025-08-28T16:00:00",
    extendedProps: { patient: "Dr. Sarah Wilson" }, // ✅ same doctor → same color
  },
];

const AppointmentCalendar = () => {
  const coloredEvents = assignRandomColors(events);

  return (
    <div className="calendar-wrapper bg-white rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>

      <div className="calendar-box">
        <div className="calendar-header">
          <h2>Today's Schedule</h2>
          <span>
            August 28, 2025 
            <button className="ml-3 px-4 py-2 rounded-lg font-semibold text-center bg-blue-600 text-white hover:bg-blue-700 transition-colors">Add Slot</button>
          </span>
        </div>

        <div className="calendar-container">
          <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView="timeGridDay"
            initialDate="2025-08-28"
            allDaySlot={false}
            slotMinTime="09:00:00"
            slotMaxTime="18:00:00"
            events={coloredEvents}
            slotDuration="00:30:00" // every slot = 30 minutes
            slotLabelInterval="01:00" // labels only every hour
            height="100%"
            nowIndicator={true}
            headerToolbar={false}
            slotLabelFormat={{
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }}
            eventDisplay="block"
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
