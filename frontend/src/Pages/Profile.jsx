import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientViewCard from "../components/Card/PatientViewCard";
import PatientAppointments from "../components/PatientDashboard/PatientAppointments";

const Profile = () => {
  const [patientDetails, setPatientDetails] = useState(null);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const patientId = userData?._id || userData?.id;
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchDetails = async () => {
    if (!patientId) {
      return;
    }
    try {
      const res = await axios.get(`${API_BASE_URL}/api/patients/${patientId}`);
      console.log(res.data);
      if (res.data?.success) {
        setPatientDetails(res.data?.patient);
      } else {
        toast("Something went wrong ! Please login");
        navigate(`/`);
      }
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };

  useEffect(() => {
    patientId && fetchDetails();
  }, [patientId]);

  return (
    <div className="flex flex-col md:px-3 lg:px-5 rounded-2xl">
      {patientDetails && (
        <PatientViewCard
          patient={patientDetails}
          setPatientDetails={setPatientDetails}
          accessedBy={"patient"}
        />
      )}
      <div className="flex flex-col items-center w-full">
        <PatientAppointments appointments={patientDetails?.appointments} />
      </div>
    </div>
  );
};

export default Profile;
