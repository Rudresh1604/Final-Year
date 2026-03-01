import axios from "axios";
import { Clock } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

export default function AppointmentDetails() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const selector = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchAppointment = async () => {
      const res = await axios.get(
        `${API_BASE_URL}/api/appointment/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${selector.user.token}`,
          },
        },
      );

      console.log(res.data);
      const data = res.data;
      setAppointment(data.appointment);
    };

    fetchAppointment();
  }, [appointmentId]);

  if (!appointment) return <div>Loading appointment...</div>;

  const joinMeeting = () => {
    navigate(`/meet/${appointment.callId}`, {
      state: {
        appointment,
      },
    });
  };

  return (
    <div className="mx-5 my-4 p-3 border border-gray-200 rounded-lg flex flex-col justify-center items-center gap-3 bg-white">
      <h2 className="text-xl font-bold">Appointment Details</h2>
      <p>Doctor: {appointment.doctorId}</p>
      <p>Patient: {appointment.patientId}</p>
      <p> Date : {moment(appointment.time).format("DD/MM/YYYY")}</p>
      <p className="flex items-center gap-2">
        <span className="flex items-center gap-2">
          <Clock className="text-sm max-sm:h-4 max-sm:w-4" /> Start Time :
        </span>
        {moment(appointment.time).format("hh:mm A")}
      </p>
      <p className="flex items-center gap-2">
        <span className="flex items-center gap-2">
          <Clock /> End Time :
        </span>

        {moment(appointment.endTime).format("hh:mm A")}
      </p>

      <h1> Reason : {appointment?.reason} </h1>
      <p>Status : {appointment?.status} </p>
      <button
        className="border cursor-pointer border-blue-600 text-white bg-blue-500 p-2 rounded-lg"
        onClick={joinMeeting}
      >
        Join Meeting
      </button>
    </div>
  );
}
