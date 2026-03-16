import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const AddDiseaseModal = ({ show, onClose, onCreated, defaultName }) => {
  const [newDisease, setNewDisease] = useState({
    name: "",
    description: "",
    symptoms: "",
    medication: "",
    precautions: "",
    workflow: "",
    notes: "",
    spreadLevel: "Low",
    city: "",
    state: "",
    country: "",
    caseCount: 0,
  });

  useEffect(() => {
    if (defaultName) {
      setNewDisease((prev) => ({ ...prev, name: defaultName }));
    }
  }, [defaultName]);

  const handleInputChange = (e) => {
    setNewDisease({
      ...newDisease,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateDisease = async () => {
    try {
      if (!newDisease.name || !newDisease.symptoms) {
        toast.error("Name and Symptoms are required");
        return;
      }

      const formattedData = {
        name: newDisease.name,
        description: newDisease.description,
        medication: newDisease.medication,
        precautions: newDisease.precautions,
        workflow: newDisease.workflow,
        notes: newDisease.notes,
        spreadLevel: newDisease.spreadLevel,
        symptoms: newDisease.symptoms.split(",").map((s) => s.trim()),
        affectedRegions: [
          {
            city: newDisease.city,
            state: newDisease.state,
            country: newDisease.country,
            coordinates: { lat: 0, long: 0 },
            caseCount: Number(newDisease.caseCount),
            lastUpdated: new Date(),
          },
        ],
      };

      const res = await axios.post(`${API_URL}/api/disease/add`, formattedData);

      if (res.data.success) {
        toast.success("Disease created successfully!");
        onCreated(res.data.disease);
        onClose();
      }
    } catch (error) {
      toast.error("Failed to create disease");
      console.error(error);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Add New Disease
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-lg"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">

  <div>
    <label className="text-sm font-medium text-gray-600">Disease Name</label>
    <input
      name="name"
      value={newDisease.name}
      onChange={handleInputChange}
      placeholder="Enter disease name (e.g. Dengue)"
      className="w-full border border-gray-300 bg-gray-50 rounded-lg px-3 py-2 mt-1 
    focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
    />
  </div>

  <div>
    <label className="text-sm font-medium text-gray-600">Symptoms (comma separated)</label>
    <input
      name="symptoms"
      value={newDisease.symptoms}
      placeholder="e.g. fever, headache, nausea"
      onChange={handleInputChange}
      className="w-full border border-gray-300 bg-gray-50 rounded-lg px-3 py-2 mt-1 
    focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
    />
  </div>

  <div>
    <label className="text-sm font-medium text-gray-600">Medication</label>
    <input
      name="medication"
      value={newDisease.medication}
      placeholder="e.g. Paracetamol, Hydration"
      onChange={handleInputChange}
      className="w-full border border-gray-300 bg-gray-50 rounded-lg px-3 py-2 mt-1 
    focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
    />
  </div>

  <div>
    <label className="text-sm text-gray-600">City</label>
    <input
      name="city"
      value={newDisease.city}
      onChange={handleInputChange}
      className="w-full border border-gray-300 bg-gray-50 rounded-lg px-3 py-2 mt-1 
    focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
    />
  </div>

  <div>
    <label className="text-sm text-gray-600">State</label>
    <input
      name="state"
      value={newDisease.state}
      onChange={handleInputChange}
      className="w-full border border-gray-300 bg-gray-50 rounded-lg px-3 py-2 mt-1 
    focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
    />
  </div>

  <div>
    <label className="text-sm text-gray-600">Country</label>
    <input
      name="country"
      value={newDisease.country}
      onChange={handleInputChange}
      className="w-full border border-gray-300 bg-gray-50 rounded-lg px-3 py-2 mt-1 
    focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
    />
  </div>

  <div className="col-span-2">
    <label className="text-sm text-gray-600">Spread Level</label>
    <select
      name="spreadLevel"
      value={newDisease.spreadLevel}
      onChange={handleInputChange}
      className="w-full border rounded-xl p-2 mt-1"
    >
      <option value="Low">Low</option>
      <option value="Moderate">Moderate</option>
      <option value="High">High</option>
    </select>
  </div>
 <div className="col-span-2">
    <label className="text-sm font-medium text-gray-600">Precautions</label>
    <textarea
      name="precautions"
      value={newDisease.precautions}
      rows={3}
      placeholder="Enter disease name (e.g. Dengue)"
      onChange={handleInputChange}
      className="w-full border border-gray-300 bg-gray-50 rounded-lg px-3 py-2 mt-1 
    focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
    />
  </div>
  <div className="col-span-2">
    <label className="text-sm text-gray-600">Description</label>
    <textarea
      name="description"
      rows={3}
      value={newDisease.description}
      onChange={handleInputChange}
      className="w-full border border-gray-300 bg-gray-50 rounded-lg px-3 py-2 mt-1 
    focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
    />
  </div>

  <div className="col-span-2">
    <label className="text-sm text-gray-600">Workflow / Treatment Process</label>
    <textarea
      name="workflow"
      rows={3}
      value={newDisease.workflow}
      onChange={handleInputChange}
      className="w-full border border-gray-300 bg-gray-50 rounded-lg px-3 py-2 mt-1 
    focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
    />
  </div>

  <div className="col-span-2">
    <label className="text-sm text-gray-600">Doctor Notes</label>
    <textarea
      name="notes"
      rows={3}
      value={newDisease.notes}
      onChange={handleInputChange}
      className="w-full border border-gray-300 bg-gray-50 rounded-lg px-3 py-2 mt-1 
    focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
    />
  </div>

</div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleCreateDisease}
            className="px-5 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 active:scale-95 transition"
          >
            Create Disease
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDiseaseModal;
