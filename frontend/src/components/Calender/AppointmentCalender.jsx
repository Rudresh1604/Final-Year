// import React from "react";
// import FullCalendar from "@fullcalendar/react";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// // import "./calendar.css"; // custom styles for styling

// const AppointmentCalendar = () => {
//   const events = [
//     {
//       title: "Cardiology Appointment\nDr. Orlando Diggs",
//       start: "2025-08-28T10:00:00",
//       end: "2025-08-28T11:00:00",
//       color: "#bfdbfe", // light blue
//       textColor: "#1e40af", // dark blue
//     },
//     {
//       title: "Follow-up\nDr. Natali Craig",
//       start: "2025-08-28T11:00:00",
//       end: "2025-08-28T12:00:00",
//       color: "#bbf7d0", // light green
//       textColor: "#166534", // dark green
//     },
//   ];

//   return (
//     <div className="p-6 bg-white rounded-2xl shadow-md max-w-3xl">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-md font-semibold">Appointments</h2>
//       </div>

//       {/* Calendar */}
//       <FullCalendar
//         plugins={[timeGridPlugin, interactionPlugin]}
//         initialView="timeGridDay"
//         initialDate="2025-08-28"
//         allDaySlot={false}
//         slotMinTime="09:00:00"
//         slotMaxTime="18:00:00"
//         events={events}
//         slotDuration="01:00:00"
//         height="600px"
//       />
//     </div>
//   );
// };

// export default AppointmentCalendar;

import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { calendarEvents } from "@/lib/data";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

const localizer = momentLocalizer(moment);

const AppointmentCalendar = () => {
  const [view, setView] = useState(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView) => {
    setView(selectedView);
  };

  return (
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]}
      view={view}
      style={{ height: "98%" }}
      onView={handleOnChangeView}
      min={new Date(2025, 1, 0, 8, 0, 0)}
      max={new Date(2025, 1, 0, 17, 0, 0)}
    />
  );
};

export default AppointmentCalendar;