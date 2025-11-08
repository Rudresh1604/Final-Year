import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const API_URL = import.meta.env.VITE_BACKEND_URL;

const MedicalHistorySummary = () => {
  const [isEditingPatient, setIsEditingPatient] = useState(false);
  const [isEditingMedical, setIsEditingMedical] = useState(false);
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [medicalData, setMedicalData] = useState(null);
  console.log(patientId)

  // Fetch patient + medical data
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/patient/summary/${patientId}`);
        if (res.data.success) {
          setPatient(res.data.patient);
          console.log(res.data)
          setMedicalData(res.data.patient.medicalHistory); // assuming your backend sends this
        }
      } catch (error) {
        console.error("Error fetching patient summary:", error);
      }
    };

    if (patientId) fetchPatient();
  }, [patientId]);
console.log(medicalData)
  if (!patient) return <p className="text-center text-gray-600">Loading...</p>;

  // Handle edits
  const handlePatientChange = (e) => {
    const { name, value } = e.target;
    setPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleMedicalChange = (e) => {
    const { name, value } = e.target;
    setMedicalData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-2">Medical History Summary</h2>
      <p className="text-gray-600 mb-6">
        Review and confirm your medical history information before submission.
      </p>

      {/* =========================== PATIENT DEMOGRAPHICS =========================== */}
<div className="border-b border-gray-200 pb-4 mb-6">
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-lg font-medium">Patient Demographics</h3>
    {isEditingPatient ? (
      <div className="space-x-2">
        <button
          className="text-green-600 text-sm font-medium"
          onClick={() => setIsEditingPatient(false)}
        >
          Save
        </button>
        <button
          className="text-gray-500 text-sm"
          onClick={() => setIsEditingPatient(false)}
        >
          Cancel
        </button>
      </div>
    ) : (
      <button
        className="text-blue-600 text-sm hover:underline"
        onClick={() => setIsEditingPatient(true)}
      >
        ✏️ Edit
      </button>
    )}
  </div>

  {/* Only Name, Age, and Contact Info */}
  <div className="space-y-3">
    {/* Name */}
    <div className="flex justify-between items-center">
      <p className="font-semibold w-1/2">Name</p>
      {isEditingPatient ? (
        <input
          type="text"
          name="name"
          value={patient.name || ""}
          onChange={handlePatientChange}
          className="border rounded-md p-2 w-1/2 text-gray-700"
        />
      ) : (
        <p className="text-gray-800 text-right w-1/2">{patient.name}</p>
      )}
    </div>

    {/* Age */}
    <div className="flex justify-between items-center">
      <p className="font-semibold w-1/2">Age</p>
      {isEditingPatient ? (
        <input
          type="number"
          name="age"
          value={patient.age || ""}
          onChange={handlePatientChange}
          className="border rounded-md p-2 w-1/2 text-gray-700"
        />
      ) : (
        <p className="text-gray-800 text-right w-1/2">{patient.age}</p>
      )}
    </div>

    {/* Contact Info */}
    <div className="flex justify-between items-center">
      <p className="font-semibold w-1/2">Contact Info</p>
      {isEditingPatient ? (
        <input
          type="text"
          name="phone"
          value={patient.phone || ""}
          onChange={handlePatientChange}
          className="border rounded-md p-2 w-1/2 text-gray-700"
        />
      ) : (
        <p className="text-gray-800 text-right w-1/2">{patient.phone}</p>
      )}
    </div>
  </div>
</div>


      {/* =========================== MEDICAL INFORMATION =========================== */}
      {/* =========================== MEDICAL INFORMATION =========================== */}
<div className="border-b border-gray-200 pb-4 mb-6">
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-lg font-medium">Medical Information</h3>
    {isEditingMedical ? (
      <div className="space-x-2">
        <button
          className="text-green-600 text-sm font-medium"
          onClick={() => setIsEditingMedical(false)}
        >
          Save
        </button>
        <button
          className="text-gray-500 text-sm"
          onClick={() => setIsEditingMedical(false)}
        >
          Cancel
        </button>
      </div>
    ) : (
      <button
        className="text-blue-600 text-sm hover:underline"
        onClick={() => setIsEditingMedical(true)}
      >
        ✏️ Edit
      </button>
    )}
  </div>

  <div className="space-y-4">
    {/* Disease Name */}
    <div>
      <p className="font-semibold text-gray-800 mb-1">Disease Name</p>
      {isEditingMedical ? (
        <input
          type="text"
          name="diseaseName"
          value={medicalData?.diseaseName || ""}
          onChange={handleMedicalChange}
          className="border rounded-md p-2 w-full text-gray-700"
        />
      ) : (
        <p className="text-gray-700">{medicalData?.diseaseName || "—"}</p>
      )}
    </div>

    {/* Description */}
    <div>
      <p className="font-semibold text-gray-800 mb-1">Description</p>
      {isEditingMedical ? (
        <textarea
          name="description"
          value={medicalData?.description || ""}
          onChange={handleMedicalChange}
          className="border rounded-md p-2 w-full text-gray-700"
          rows="2"
        />
      ) : (
        <p className="text-gray-700">{medicalData?.description || "—"}</p>
      )}
    </div>

    {/* Precaution */}
    <div>
      <p className="font-semibold text-gray-800 mb-1">Precaution</p>
      {isEditingMedical ? (
        <textarea
          name="precaution"
          value={medicalData?.precaution || ""}
          onChange={handleMedicalChange}
          className="border rounded-md p-2 w-full text-gray-700"
          rows="2"
        />
      ) : (
        <p className="text-gray-700">{medicalData?.precaution || "—"}</p>
      )}
    </div>

    {/* Medication */}
    <div>
      <p className="font-semibold text-gray-800 mb-1">Medication</p>
      {isEditingMedical ? (
        <textarea
          name="medication"
          value={medicalData?.medication || ""}
          onChange={handleMedicalChange}
          className="border rounded-md p-2 w-full text-gray-700"
          rows="2"
        />
      ) : (
        <p className="text-gray-700">{medicalData?.medication || "—"}</p>
      )}
    </div>

    {/* Workflow */}
    <div>
      <p className="font-semibold text-gray-800 mb-1">Workflow</p>
      {isEditingMedical ? (
        <textarea
          name="workflow"
          value={medicalData?.workflow || ""}
          onChange={handleMedicalChange}
          className="border rounded-md p-2 w-full text-gray-700"
          rows="2"
        />
      ) : (
        <p className="text-gray-700">{medicalData?.workflow || "—"}</p>
      )}
    </div>

    {/* Notes */}
    <div>
      <p className="font-semibold text-gray-800 mb-1">Notes</p>
      {isEditingMedical ? (
        <textarea
          name="notes"
          value={medicalData?.notes || ""}
          onChange={handleMedicalChange}
          className="border rounded-md p-2 w-full text-gray-700"
          rows="2"
        />
      ) : (
        <p className="text-gray-700">{medicalData?.notes || "—"}</p>
      )}
    </div>
  </div>
</div>


      {/* =========================== SUBMIT BUTTON =========================== */}
      <div className="flex justify-end">
        <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-md">
          Confirm and Submit
        </button>
      </div>
    </div>
  );
};

export default MedicalHistorySummary;
