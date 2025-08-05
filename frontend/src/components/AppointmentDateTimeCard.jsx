import React from "react";

const AppointmentDateTimeCard = ({
  selectedDate,
  date,
  setSelectedDate,
  isDate,
  time,
  setSelectedTime,
  selectedTime,
  setOpenModal,
}) => {
  function toIST(isoString) {
    const utcDate = new Date(isoString);
    return new Date(utcDate.getTime() + 5.5 * 60 * 60 * 1000); // UTC + 5:30
  }

  function formatDateOnlyIST(isoDate) {
    const istDate = toIST(isoDate);
    return istDate.toLocaleDateString("en-IN", {
      day: "2-digit", // e.g., "05"
      month: "short", // e.g., "Aug"
    }); // → "05 Aug"
  }

  function formatTime12HourIST(isoTime) {
    const istDate = toIST(isoTime);
    return istDate.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }); // → "03:30 AM"
  }

  const handleSelected = (value) => {
    console.log(value);
    !isDate && setOpenModal(true);
    isDate ? setSelectedDate(value) : setSelectedTime(value);
  };

  return (
    <div>
      <div
        className={`border border-gray-300 text-center ${
          isDate && date == selectedDate
            ? "bg-selected-color text-white"
            : "bg-gray-200"
        } ${
          !isDate && selectedTime == time
            ? "bg-selected-color text-white"
            : "bg-gray-200"
        } p-2 px-4 font-bold rounded-lg cursor-pointer`}
        onClick={() => handleSelected(isDate ? date : time)}
      >
        <h1>
          {isDate
            ? String(date?.day).slice(0, 3)
            : formatTime12HourIST(time?.from)}{" "}
        </h1>
        <p>{isDate && formatDateOnlyIST(date?.from)}</p>
      </div>
    </div>
  );
};

export default AppointmentDateTimeCard;
