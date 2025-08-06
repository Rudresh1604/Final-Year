import React, { useEffect, useState } from "react";
import AppointmentDateTimeCard from "./AppointmentDateTimeCard";
import { Button, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { Modal } from "flowbite-react";
import AppointmentForm from "./AppointmentForm";
import { useSelector } from "react-redux";
import { selectAuth, selectLoading } from "../../redux/rootSlice";

const AppointmentPicker = () => {
  const [openModal, setOpenModal] = useState(false);
  const { user } = useSelector(selectAuth);
  const { loading } = useSelector(selectLoading);
  console.log(user);

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
  }, [selectedDay, openModal]);

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
    <div className="flex flex-col mt-9 w-full items-center border border-gray-300 bg-gray-50 rounded-lg gap-3">
      <div className="flex flex-col w-full p-3 lg:p-5 gap-4">
        <h1 className="text-xl text-gray-700 lg:text-2xl font-medium">
          Select Date to schedule the Appointment :
        </h1>
        <div className="grid grid-cols-3 lg:grid-cols-7 bg-white border border-gray-200 rounded-lg justify-center gap-3 p-4 w-full">
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
      <span className="w-full border-b mx-3 border-gray-300"></span>
      <div className="w-full px-3 lg:px-5 py-4">
        <h1 className="text-xl text-gray-700 ml-2 lg:text-2xl font-medium">
          Select Time to schedule the Appointment :
        </h1>
        <div className="grid grid-cols-3 p-4 rounded-lg lg:grid-cols-7 w-full bg-white border lg:p-6 border-gray-200 mt-5 gap-3 md:gap-4 lg:gap-5">
          {selectedDay &&
            timeSlots?.map((time, index) => (
              <AppointmentDateTimeCard
                isDate={false}
                time={time}
                key={index}
                setSelectedTime={setSelectedTime}
                selectedTime={selectedTime}
                setOpenModal={setOpenModal}
              />
            ))}
          <Modal
            show={openModal}
            size="md"
            position="bottom-center"
            onClose={() => setOpenModal(false)}
            className="mt-28"
            dismissible
          >
            <ModalHeader>
              <div className="text-center px-3">
                Please provide some more details !
              </div>
            </ModalHeader>
            <ModalBody>
              <AppointmentForm />
            </ModalBody>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPicker;
