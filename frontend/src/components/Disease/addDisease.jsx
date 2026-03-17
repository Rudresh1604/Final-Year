import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const AddDiseaseModal = ({ show, onClose, onCreated, defaultName }) => {
  const defaultForm = {
    name: "",
    description: "",
    symptoms: "",
    medication: "",
    precautions: "",
    workflow:"",
      
    notes:"",
      
    spreadLevel: "Low",
    city: "",
    state: "",
    country: "",
    caseCount: 0,
  };

  const [newDisease, setNewDisease] = useState(defaultForm);

  useEffect(() => {
    if (show) {
      setNewDisease({ ...defaultForm, name: defaultName || "" });
    }
  }, [show, defaultName]);

  const handleInputChange = (e) => {
    setNewDisease({
      ...newDisease,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setNewDisease(defaultForm);
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
        resetForm();
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
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            🦠 Add New Disease
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Disease Name */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Disease Name
            </label>
            <input
              name="name"
              placeholder="Enter disease name (e.g. Dengue)"
              value={newDisease.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 bg-gray-50 rounded-lg px-3 py-2 mt-1 
              focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Spread Level */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Spread Level
            </label>
            <select
              name="spreadLevel"
              value={newDisease.spreadLevel}
              onChange={handleInputChange}
              className="w-full border border-gray-300 bg-gray-50 rounded-lg px-3 py-2 mt-1 
              focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer"
            >
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Symptoms */}
          <div className="col-span-2">
            <label className="text-sm font-medium text-gray-600">
              Symptoms (comma separated)
            </label>
            <textarea
              rows={2}
              name="symptoms"
              placeholder="e.g. fever, headache, nausea"
              value={newDisease.symptoms}
              onChange={handleInputChange}
              className="w-full border border-gray-300 bg-gray-50 rounded-lg px-3 py-2 mt-1 
              focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Medication */}
          <div className="col-span-2">
            <label className="text-sm font-medium text-gray-600">
              Medication
            </label>
            <textarea
              rows={2}
              name="medication"
              placeholder="e.g. Paracetamol, Oral rehydration, Rest"
              value={newDisease.medication}
              onChange={handleInputChange}
              className="w-full border border-gray-300 bg-gray-50 rounded-lg px-3 py-2 mt-1 
              focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Precautions */}
          <div className="col-span-2">
            <label className="text-sm font-medium text-gray-600">
              Precautions
            </label>
            <textarea
              rows={2}
              name="precautions"
              placeholder="e.g. Drink fluids, Avoid mosquito bites"
              value={newDisease.precautions}
              onChange={handleInputChange}
              className="w-full border border-gray-300 bg-gray-50 rounded-lg px-3 py-2 mt-1 
              focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Affected Region Section */}
          <div className="col-span-2 rounded-xl p-4 bg-gray-50">
            <h3 className="text-md font-semibold text-gray-700 mb-3">
              Affected Region
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">City</label>
                <input
                  name="city"
                  placeholder="Enter affected city"
                  value={newDisease.city}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 
              focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">State</label>
                <input
                  name="state"
                  placeholder="Enter state"
                  value={newDisease.state}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 
                  focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Country</label>
                <input
                  name="country"
                  placeholder="Enter country"
                  value={newDisease.country}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 
                  focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Case Count</label>
                <input
                  type="number"
                  name="caseCount"
                  placeholder="Enter reported cases"
                  value={newDisease.caseCount}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 
                  focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="text-sm text-gray-600">Description</label>
            <textarea
              rows={3}
              name="description"
              placeholder="Enter a brief description of the disease"
              value={newDisease.description}
              onChange={handleInputChange}
              className="w-full border border-gray-300 bg-gray-50 rounded-lg px-3 py-2 mt-1 
              focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Workflow */}
          <div className="col-span-2">
            <label className="text-sm text-gray-600">
              Workflow / Treatment Process
            </label>
            <textarea
              rows={3}
              name="workflow"
              placeholder="Describe treatment process followed by doctors"
              value={newDisease.workflow}
              onChange={handleInputChange}
              className="w-full border border-gray-300 bg-gray-50 rounded-lg px-3 py-2 mt-1 
              focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Notes */}
          <div className="col-span-2">
            <label className="text-sm text-gray-600">Doctor Notes</label>
            <textarea
              rows={3}
              name="notes"
              placeholder="Additional notes or recommendations"
              value={newDisease.notes}
              onChange={handleInputChange}
              className="w-full border border-gray-300 bg-gray-50 rounded-lg px-3 py-2 mt-1 
              focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleCreateDisease}
            className="px-5 py-2 rounded-lg bg-green-500 text-white font-medium
            hover:bg-green-600 active:scale-95 transition cursor-pointer"
          >
            Create Disease
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDiseaseModal;
