import React, { useEffect, useState } from "react";
import AppointmentHeader from "../components/AppointmentDetails/AppointmentHeader";
import ActionSection from "../components/AppointmentDetails/ActionSection";
import ReportSection from "../components/AppointmentDetails/ReportSection";
import PatientInfo from "../components/AppointmentDetails/PatientInfo";
import DoctorInfo from "../components/AppointmentDetails/DoctorInfo";
import MeetingCard from "../components/AppointmentDetails/MeetingCard";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";



const AppointmentDetails = () => {
  const params = useParams();
  const navigate=useNavigate()
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    // console.log("hello");

    async function fetchAppointment ()  {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/appointment/${params.appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("userData")
            ).token}`,
          },
        }
      );
      if (res.data.success) {
        setAppointment(res.data.appointment);
      }
      setLoading(false);
    };

    fetchAppointment();
  }, [params.appointmentId]);

  if (loading) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  if (!loading && !appointment)
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

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* HEADER */}
        <AppointmentHeader appointment={appointment} />

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <MeetingCard appointment={appointment} />
            <PatientInfo patient={appointment.patientId} />
          </div>

          <div className="space-y-6">
            <DoctorInfo doctor={appointment.doctorId} />
            {appointment.status !== "Completed" ? (
              <ActionSection status={appointment.status} />
            ) : (
              <ReportSection report={appointment.report} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
