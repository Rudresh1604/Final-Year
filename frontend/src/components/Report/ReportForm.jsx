import { useState } from "react";
import InfoRow from "./InfoRow";
import EditablePrescriptionTable from "./EditablePrescriptionTable";
import { toast } from "react-toastify";
import axios from "axios";

const ReportForm = () => {
  const [prescriptions, setPrescriptions] = useState([
    { medicine: "", time: "", amount: "", days: 0 },
  ]);

  const [formData, setFormData] = useState({
    diseases: "",
    description: "",
    precautions: "",
    diet: "",
    workout: "",
    notes: "",
    nextVisit: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.diseases.trim()) {
      toast.error("Please enter at least one disease");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Description is required");
      return;
    }
    console.log(typeof prescriptions[0].days);
    if (
      prescriptions.length === 0 ||
      !prescriptions[0].amount.trim() ||
      !prescriptions[0].medicine.trim() ||
      !prescriptions[0].time.trim() ||
      prescriptions[0].days < 1
    ) {
      toast.error("Prescriptions are required");
      return;
    }

    formData.medicines = prescriptions;
    formData.doctorId = "68888e0e7729dff42801add2";
    formData.patientId = "68888dfb86635ac8bdd3e4a3";
    formData.appointmentId = "691c20e6d4c9f1694ecd7de6";

    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/reports/add`,
      formData,
    );
    if (res.data.success) {
      toast.success(res.data.message);
      setFormData({
        diseases: "",
        description: "",
        precautions: "",
        diet: "",
        workout: "",
        notes: "",
        nextVisit: "",
      });
      setPrescriptions([{ medicine: "", time: "", amount: "", days: 0 }]);
      return;
    }
    toast.error(res.data.message);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow">
      {/* Header */}
      <section className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">
          🩺 Medical Report Form
        </h1>
      </section>

      {/* Patient Info */}
      <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
        Patient Details
      </h2>

      <div className="space-y-1">
        <InfoRow label="Name" value="John Doe" />
        <InfoRow label="Age" value={30} />
        <InfoRow label="Gender" value="Male" />
        <InfoRow
          label="Date of Checkup"
          value={new Date().toLocaleDateString()}
        />
      </div>

      <hr className="my-6" />

      <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
        Medical Details
      </h2>

      {/* Form Fields */}
      <form
        className="flex flex-col gap-5 text-sm text-gray-800"
        onSubmit={handleSubmit}
      >
        {/* Diseases */}
        <div>
          <label className="text-sm font-medium text-gray-600">Diseases</label>
          <input
            type="text"
            name="diseases"
            value={formData.diseases}
            onChange={handleChange}
            placeholder="Asthma, Diabetes, etc."
            className="w-full p-2 border border-gray-300 bg-gray-50 rounded-lg  focus:outline-blue-500 focus:outline-2"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter your diagnosis here..."
            className="w-full p-2 border border-gray-300 bg-gray-50 rounded-lg  focus:outline-blue-500 focus:outline-2"
            required
          />
        </div>

        {/* Prescription Table */}
        <EditablePrescriptionTable
          prescriptions={prescriptions}
          setPrescriptions={setPrescriptions}
        />

        {/* Precautions */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Precautions
          </label>
          <input
            type="text"
            name="precautions"
            value={formData.precautions}
            onChange={handleChange}
            placeholder="(optional) e.g., Avoid oily food"
            className="w-full p-2 border border-gray-300 bg-gray-50 rounded-lg  focus:outline-blue-500 focus:outline-2"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="text-sm font-medium text-gray-600">Notes</label>
          <input
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="(optional) e.g., Patient should continue medication and follow breathing exercises."
            className="w-full p-2 border border-gray-300 bg-gray-50 rounded-lg  focus:outline-blue-500 focus:outline-2"
          />
        </div>

        {/* Diet */}
        <div>
          <label className="text-sm font-medium text-gray-600">Diet</label>
          <input
            type="text"
            name="diet"
            value={formData.diet}
            onChange={handleChange}
            placeholder="(optional) e.g. patient should eat light food"
            className="w-full p-2 border border-gray-300 bg-gray-50 rounded-lg  focus:outline-blue-500 focus:outline-2"
          />
        </div>

        {/* Workout */}
        <div>
          <label className="text-sm font-medium text-gray-600">Workout</label>
          <input
            type="text"
            name="workout"
            value={formData.workout}
            onChange={handleChange}
            placeholder="(optional) e.g. patient should do light exercise"
            className="w-full p-2 border border-gray-300 bg-gray-50 rounded-lg  focus:outline-blue-500 focus:outline-2"
          />
        </div>

        {/* Next Visit */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Next Visit (if required)
          </label>
          <input
            type="date"
            name="nextVisit"
            value={formData.nextVisit}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 bg-gray-50 rounded-lg  focus:outline-blue-500 focus:outline-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition hover:cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
