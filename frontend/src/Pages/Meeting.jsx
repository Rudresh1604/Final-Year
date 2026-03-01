import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import axios from "axios";
import { useSelector } from "react-redux";

export default function MeetingPage() {
  const { callId } = useParams();
  const location = useLocation();

  const appointment = location.state?.appointment;

  const userId = appointment.patientId || appointment.doctorId;
  const selector = useSelector((state) => state.auth);
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const initCall = async () => {
      const res = await axios.get(
        `${API_BASE_URL}/api/appointment/stream/token/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${selector.user.token}`,
          },
        },
      );
      console.log(res.data);

      const { token } = res.data;

      const user = {
        id: userId,
      };

      const videoClient = StreamVideoClient.getOrCreateInstance({
        apiKey: import.meta.env.VITE_STREAM_API_KEY,
        user,
        token,
      });

      const call = videoClient.call("default", callId);

      await call.join();

      setClient(videoClient);
      setCall(call);
    };

    initCall();
  }, [callId, userId]);

  if (!client || !call) return <div>Joining meeting...</div>;

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <SpeakerLayout />
        <CallControls />
      </StreamCall>
    </StreamVideo>
  );
}
