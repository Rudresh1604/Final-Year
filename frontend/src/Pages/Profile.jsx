import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DoctorProfileCard from "../components/DoctorDashboard/DoctorProfileCard";
import AllAppointmentsViewer from "../components/PatientDashboard/AllAppointmentsViewer";
import PatientProfileCard from "../components/Card/PatientProfileCard";
import PatientViewCard from "../components/DoctorDashboard/PatientViewCard";

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
        `${API_BASE_URL}/api/${isPatient ? "patients" : "doctors"}/` + userId,
      );
      console.log(res.data);
      if (res.data?.success) {
        if (isPatient) setUserDetails(res.data?.patient);
        else setUserDetails(res.data?.doctor);
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
    userId && fetchDetails();
  }, [userId]);

  if (isPatient) {
    return (
      <div className="flex flex-col md:px-3 lg:px-5 rounded-2xl">
        {userDetails && (
          <PatientProfileCard
            patient={userDetails}
            setPatientDetails={setUserDetails}
            accessedBy={"patient"}
          />
        )}
        <div className="flex flex-col items-center w-full">
          <AllAppointmentsViewer
            isPatientView={true}
            appointments={userDetails?.appointments}
          />
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
      <div className="flex flex-col md:flex-row items-center w-full">
        <div className="w-full md:w-1/2">
          <AllAppointmentsViewer
            isPatientView={false}
            appointments={userDetails?.appointments}
          />
        </div>
        <div className="w-full shadow border border-gray-200 md:w-1/2 py-2 px-4 rounded-lg bg-white mx-2 my-3">
          <h1 className="text-lg md:text-xl font-bold text-gray-600">
            My Patients{" "}
          </h1>
          <div className="flex my-3 flex-col gap-2">
            {userDetails?.patients?.map((patient, index) => (
              <PatientViewCard key={index} patient={patient} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
