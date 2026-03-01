import React from "react";
import AppointmentHeader from "../components/AppointmentDetails/AppointmentHeader";
import ActionSection from "../components/AppointmentDetails/ActionSection";
import ReportSection from "../components/AppointmentDetails/ReportSection";
import PatientInfo from "../components/AppointmentDetails/PatientInfo";
import DoctorInfo from "../components/AppointmentDetails/DoctorInfo";
import MeetingCard from "../components/AppointmentDetails/MeetingCard";

const appointment = {
  _id: "65f1ab2345cde67890123456",
  patientId: {
    _id: "p123",
    name: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    phone: "+91 9876543210",
    age: 32,
    gender: "Male",
  },
  doctorId: {
    _id: "d456",
    name: "Dr. Priya Mehta",
    specialization: "Cardiologist",
    phone: "+91 9988776655",
    hospital: "City Care Hospital, Pune",
  },
  date: new Date(),
  time: new Date("2026-03-05T10:00:00"),
  endTime: new Date("2026-03-05T10:30:00"),
  status: "Completed",
  reason: "Chest discomfort and mild shortness of breath for 2 days",
  report: "",
  createdAt: new Date("2026-03-01T09:00:00"),
};

const AppointmentDetails = () => {
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
