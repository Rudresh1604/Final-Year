import React, { useEffect, useRef, useState } from "react";
import InfoRow from "../components/Report/InfoRow";
import html2pdf from "html2pdf.js";
import InfoBlock from "../components/Report/InfoBlock";
import PrescriptionTable from "../components/Report/PrescriptionTable";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ReportPage = () => {
  const reportRef = useRef();
  const [reportData, setReportData] = useState(null);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (!params.reportId) {
      navigate("/");
    }

    async function getReport() {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/reports/${params.reportId}`,
      );
      setReportData(res.data.report);
    }
    getReport();
  }, [params.reportId]);

  //no data found in report
  if (!reportData) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold">No report data found</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleDownloadPdf = () => {
    const element = reportRef.current;
    const options = {
      margin: 0.3,
      filename: `Medical_Report_${reportData.patient.name}_${reportData.patient.dateOfCheckup}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <section className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">🩺 Medical Report</h1>
        <button
          className="bg-green-600 hover:bg-green-700 transition-colors text-white rounded-lg py-2 px-5 shadow-md cursor-pointer"
          onClick={handleDownloadPdf}
        >
          Download PDF
        </button>
      </section>

      {/* Report Body */}
      <section
        ref={reportRef}
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
      >
        {/* Patient Details */}
        <h2 className="text-xl font-semibold border-b pb-2 text-gray-700 mb-4">
          Patient Details
        </h2>
        <div>
          <InfoRow label="Name" value={reportData.patientId.name} />
          <InfoRow label="Age" value={reportData.patientId.age} />
          <InfoRow label="Gender" value={reportData.patientId.gender} />
          <InfoRow
            label="Date of Checkup"
            value={new Date(reportData.appointmentId.date).toISOString().split('T')[0]}
          />
        </div>

        {/* Medical Info */}
        <h2 className="text-xl font-semibold border-b pb-2 text-gray-700 my-6">
          Medical Info
        </h2>
        <div>
          <InfoRow label="Disease" value={reportData.diseases} />
          <InfoBlock
            label="Description"
            value={reportData.description}
          />
          <PrescriptionTable prescriptions={reportData.medicines} />
          <InfoBlock
            label="Precautions"
            value={reportData.precautions}
          />
          <InfoBlock
            label="Recommended Diet"
            value={reportData.diet || "No specific diet recommended"}
          />
          <InfoBlock
            label="Recommended Workout"
            value={
              reportData.workout || "No specific workout recommended"
            }
          />
        </div>

        {/* Doctor Section */}
        <div className="mt-4 ">
          <h3 className="text-lg font-semibold border-b pb-2 mb-3 text-gray-700">
            Doctor's Details
          </h3>
          <InfoRow label="Doctor's Name" value={reportData.doctorId.name} />
          <InfoRow label="Next Session Date" value={new Date(reportData.nextVisit).toISOString().split('T')[0] || "None"} />
          <InfoBlock label="Notes" value={reportData.notes} />
        </div>
      </section>
    </div>
  );
};

export default ReportPage;
