import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientViewCard from "../components/Card/PatientViewCard";
import PatientAppointments from "../components/PatientDashboard/PatientAppointments";
import { toast } from "react-toastify";
import DoctorProfileCard from "../components/DoctorDashboard/DoctorProfileCard";

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userId = userData?._id || userData?.id;
  let isPatient = userData?.role == "Patient" ? 1 : 0;
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchDetails = async () => {
    if (!userId) {
      return;
    }
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/${isPatient ? "patients" : "doctors"}/` + userId
      );
      console.log(res.data);
      if (res.data?.success) {
        if (isPatient) setUserDetails(res.data?.patient);
        else setUserDetails(res.data?.doctor);
      } else {
        toast("Something went wrong ! Please login");
        // navigate(`/`);
      }
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };

  useEffect(() => {
    userId && fetchDetails();
  }, [userId]);

  if (isPatient) {
    return (
      <div className="flex flex-col md:px-3 lg:px-5 rounded-2xl">
        {userDetails && (
          <PatientViewCard
            patient={userDetails}
            setPatientDetails={setUserDetails}
            accessedBy={"patient"}
          />
        )}
        <div className="flex flex-col items-center w-full">
          <PatientAppointments appointments={userDetails?.appointments} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:px-3 lg:px-5 rounded-2xl">
      {userDetails && (
        <DoctorProfileCard
          doctor={userDetails}
          setDoctorDetails={setUserDetails}
        />
      )}
      {/* <div className="flex flex-col items-center w-full">
        <PatientAppointments appointments={patientDetails?.appointments} />
      </div> */}
    </div>
  );
};

export default Profile;
