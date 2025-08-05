import React, { useEffect, useState } from "react";
import AppointmentDateTimeCard from "./AppointmentDateTimeCard";

const AppointmentPicker = () => {
  const [availableSlot, setAvailableSlot] = useState([
    {
      day: "Tuesday",
      from: "2025-08-05T03:30:00Z",
      to: "2025-08-05T11:30:00Z",
    },

    {
      day: "Wednesday",
      from: "2025-08-06T10:00:00Z",
      to: "2025-08-06T18:00:00Z",
    },
    {
      day: "Monday",
      from: "2025-08-04T10:00:00Z",
      to: "2025-08-04T18:00:00Z",
    },
    {
      day: "Thursday",
      from: "2025-08-07T10:00:00Z",
      to: "2025-08-07T18:00:00Z",
    },
    {
      day: "Friday",
      from: "2025-08-08T10:00:00Z",
      to: "2025-08-08T18:00:00Z",
    },
  ]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDay, setSelectedDay] = useState(availableSlot[0]);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    selectedDay && getTimeSlots(selectedDay);
  }, [selectedDay]);

  function getTimeSlots(selectedDay, intervalMinutes = 30) {
    const slots = [];
    const start = new Date(selectedDay?.from);
    const end = new Date(selectedDay?.to);

    while (start < end) {
      const slotStart = new Date(start);
      start.setMinutes(start.getMinutes() + intervalMinutes);
      const slotEnd = new Date(start);

      slots.push({
        from: slotStart.toISOString(),
        to: slotEnd.toISOString(),
      });
      setTimeSlots(slots);
    }

    return slots;
  }

  return (
    <div className="flex flex-col w-full items-center gap-3">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl  lg:text-2xl font-medium">
          Select Date to schedule the Appointment
        </h1>
        <div className="flex items-center bg-white border border-gray-200 rounded-lg justify-center gap-3 p-4 w-full">
          {availableSlot?.map((item, index) => (
            <AppointmentDateTimeCard
              key={index}
              selectedDate={selectedDay}
              date={item}
              isDate={true}
              setSelectedDate={setSelectedDay}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 p-4 rounded-lg lg:grid-cols-7 bg-white border lg:p-6 border-gray-200 mt-5 gap-3 md:gap-4 lg:gap-5">
        {selectedDay &&
          timeSlots?.map((time, index) => (
            <AppointmentDateTimeCard
              isDate={false}
              time={time}
              key={index}
              setSelectedTime={setSelectedTime}
              selectedTime={selectedTime}
            />
          ))}
      </div>
    </div>
  );
};

export default AppointmentPicker;
