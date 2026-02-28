import axios from "axios";
import { Modal, ModalBody, ModalHeader, Button } from "flowbite-react";
import { Datepicker } from "flowbite-react";
import { Clock, Plus, X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { combineDateAndTime } from "../../../utils/utils";

const AddAvailabilityModal = ({ openModal, handleModalClose, doctorId }) => {
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);

  const addTimeSlot = () => {
    const newId =
      timeSlots.length > 0 ? Math.max(...timeSlots.map((s) => s.id)) + 1 : 1;

    setTimeSlots([
      ...timeSlots,
      { id: newId, startTime: "09:00", endTime: "17:00" },
    ]);
  };

  const removeTimeSlot = (id) => {
    if (timeSlots.length > 1) {
      setTimeSlots(timeSlots.filter((slot) => slot.id !== id));
    }
  };

  const updateTimeSlot = (id, field, value) => {
    setTimeSlots(
      timeSlots.map((slot) =>
        slot.id === id ? { ...slot, [field]: value } : slot,
      ),
    );
  };

  const handleSubmit = async () => {
    try {
      const promises = timeSlots.map((slot) =>
        axios.post(`${API_BASE_URL}/api/doctors/slots`, {
          doctorId: doctorId,
          date: selectedDate.toISOString().split("T")[0],
          from: combineDateAndTime(selectedDate, slot.startTime),
          to: combineDateAndTime(selectedDate, slot.endTime),
        }),
      );

      await Promise.all(promises);

      toast("Available slots created successfully!");

      handleModalClose();
    } catch (error) {
      console.error(error);
      toast(error.message || "Error creating slots");
    }
  };

  return (
    <Modal
      show={openModal}
      position="top-center"
      onClose={handleModalClose}
      dismissible
      size="3xl"
      className="w-full h-full"
    >
      {" "}
      <ModalHeader className="border-b border-gray-200">
        {" "}
        <div className="flex items-center gap-2">
          {" "}
          <Clock className="w-6 h-6 text-blue-600" />{" "}
          <span className="text-xl font-semibold">
            Set Doctor Availability
          </span>{" "}
        </div>{" "}
      </ModalHeader>
      <ModalBody className="overflow-auto max-h-[70vh] p-6">
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>

            <Datepicker
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              className="w-full"
            />
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Working Hours
              </label>

              <Button
                size="sm"
                color="light"
                onClick={addTimeSlot}
                className="!border !border-gray-300"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Slot
              </Button>
            </div>

            <div className="space-y-3">
              {timeSlots.map((slot) => (
                <div
                  key={slot.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Start Time
                      </label>

                      <input
                        type="time"
                        value={slot.startTime}
                        onChange={(e) =>
                          updateTimeSlot(slot.id, "startTime", e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        End Time
                      </label>

                      <input
                        type="time"
                        value={slot.endTime}
                        onChange={(e) =>
                          updateTimeSlot(slot.id, "endTime", e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                  </div>

                  {timeSlots.length > 1 && (
                    <button
                      onClick={() => removeTimeSlot(slot.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              color="light"
              onClick={handleModalClose}
              className="!border !border-gray-300"
            >
              Cancel
            </Button>

            <Button
              color="blue"
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Save Availability
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default AddAvailabilityModal;
