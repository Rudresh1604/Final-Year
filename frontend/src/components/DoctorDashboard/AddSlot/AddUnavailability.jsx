import axios from "axios";
import { Modal, ModalBody, ModalHeader, Button } from "flowbite-react";
import { Datepicker } from "flowbite-react";
import { Clock, Plus, X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { combineDateAndTime } from "../../../utils/utils";

const AddUnavailabilityModal = ({ openModal, handleModalClose, doctorId }) => {
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [unavailableSlots, setUnavailableSlots] = useState([]);

  const addUnavailableSlot = () => {
    const newId =
      unavailableSlots.length > 0
        ? Math.max(...unavailableSlots.map((s) => s.id)) + 1
        : 1;

    setUnavailableSlots([
      ...unavailableSlots,
      {
        id: newId,
        startTime: "12:00",
        endTime: "13:00",
        reason: "",
        title: "",
      },
    ]);
  };

  const removeUnavailableSlot = (id) => {
    setUnavailableSlots(unavailableSlots.filter((slot) => slot.id !== id));
  };

  const updateUnavailableSlot = (id, field, value) => {
    setUnavailableSlots(
      unavailableSlots.map((slot) =>
        slot.id === id ? { ...slot, [field]: value } : slot,
      ),
    );
  };

  const handleSubmit = async () => {
    try {
      const formattedSlots = unavailableSlots.map((slot) => ({
        type: slot.type || "OTHER",
        title: slot.title || "BREAK",
        startTime: combineDateAndTime(selectedDate, slot.startTime),
        endTime: combineDateAndTime(selectedDate, slot.endTime),
        reason: slot.reason || "Unavailable",
      }));

      await axios.post(`${API_BASE_URL}/api/doctors/unavailablity`, {
        doctorId: doctorId,
        unAvailabilitySlot: formattedSlots,
      });

      toast("Unavailability created successfully!");

      handleModalClose();
    } catch (error) {
      console.error(error);
      toast("Error creating unavailability");
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
          <Clock className="w-6 h-6 text-red-600" />{" "}
          <span className="text-xl font-semibold">
            Set Doctor Unavailability{" "}
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
              //   minDate={new Date()}
              className="w-full"
            />
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Break / Unavailable Periods
              </label>

              <Button
                size="sm"
                color="light"
                onClick={addUnavailableSlot}
                className="!border !border-gray-300"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Break
              </Button>
            </div>

            <div className="space-y-3">
              {unavailableSlots.map((slot) => (
                <div
                  key={slot.id}
                  className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200"
                >
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    {/* Start Time */}
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Start Time
                      </label>

                      <input
                        type="time"
                        value={slot.startTime}
                        onChange={(e) =>
                          updateUnavailableSlot(
                            slot.id,
                            "startTime",
                            e.target.value,
                          )
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>

                    {/* End Time */}
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        End Time
                      </label>

                      <input
                        type="time"
                        value={slot.endTime}
                        onChange={(e) =>
                          updateUnavailableSlot(
                            slot.id,
                            "endTime",
                            e.target.value,
                          )
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>

                    {/* Type */}
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Type
                      </label>

                      <select
                        name="type"
                        value={slot.title}
                        onChange={(e) =>
                          updateUnavailableSlot(slot.id, "type", e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      >
                        <option value="LUNCH_BREAK">LUNCH_BREAK</option>
                        <option value="OPERATION">OPERATION</option>
                        <option value="EMERGENCY_LEAVE">EMERGENCY_LEAVE</option>
                        <option value="MEETING">MEETING</option>
                        <option value="VACATION">VACATION</option>
                        <option value="PERSONAL_BREAK">PERSONAL_BREAK</option>
                        <option value="OTHER">OTHER</option>
                      </select>
                    </div>

                    {/* Title */}
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Title
                      </label>

                      <input
                        type="text"
                        value={slot.title}
                        onChange={(e) =>
                          updateUnavailableSlot(
                            slot.id,
                            "title",
                            e.target.value,
                          )
                        }
                        placeholder="e.g., Lunch break"
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                    {/* Reason */}
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Reason (Optional)
                      </label>

                      <input
                        type="text"
                        value={slot.reason}
                        onChange={(e) =>
                          updateUnavailableSlot(
                            slot.id,
                            "reason",
                            e.target.value,
                          )
                        }
                        placeholder="e.g., Lunch break"
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeUnavailableSlot(slot.id)}
                    className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button
                color="light"
                onClick={handleModalClose}
                className="!border !border-gray-300"
              >
                Cancel
              </Button>

              <Button color="red" onClick={handleSubmit}>
                Save Unavailability
              </Button>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default AddUnavailabilityModal;
