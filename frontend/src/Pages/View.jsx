import React, { useEffect, useState } from "react";
import DoctorIntro from "../components/Appointment/DoctorIntro";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const View = () => {
  const { doctorId } = useParams();
  const [doctorDetails, setDoctorDetails] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const fetchDoctorDetails = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/doctors/${doctorId}`);
      console.log(res.data);
      if (res.data) {
        setDoctorDetails(res.data);
      } else {
        toast(res.data?.message || "Something went wrong try again !");
      }
    } catch (error) {
      toast(error?.message || "Something went wrong try again !");
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDoctorDetails();
  }, [doctorId]);
  return (
    <div>
      <DoctorIntro doctor={doctorDetails} />
    </div>
  );
};

export default View;
