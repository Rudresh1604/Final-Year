// import { useEffect, useState } from "react";
// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import {
//   StreamVideo,
//   StreamCall,
//   CallControls,
//   SpeakerLayout,
// } from "@stream-io/video-react-sdk";
// import { StreamVideoClient } from "@stream-io/video-react-sdk";

// import "@stream-io/video-react-sdk/dist/css/styles.css";
// import axios from "axios";
// import { useSelector } from "react-redux";

// export default function MeetingPage() {
//   const { callId } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const appointment = location.state;
//   const selector = useSelector((state) => state.auth);
//   const [client, setClient] = useState(null);
//   const [call, setCall] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

//   const userId = appointment?.patientId?._id;

//   useEffect(() => {
//     let isMounted = true;
//     let videoClient = null;

//     const initializeCall = async () => {
//       try {
//         // Validate required data
//         if (!appointment) {
//           throw new Error(
//             "No appointment data found. Please go back and try again.",
//           );
//         }

//         if (!userId) {
//           throw new Error("User ID not found in appointment data.");
//         }

//         if (!callId) {
//           throw new Error("Call ID is missing.");
//         }

//         if (!selector?.user?.token) {
//           throw new Error(
//             "Authentication token is missing. Please log in again.",
//           );
//         }

//         console.log("Fetching Stream token for user:", userId);

//         // Fetch token from backend
//         const response = await axios.get(
//           `${API_BASE_URL}/api/appointment/stream/token/${userId}`,
//           {
//             headers: { Authorization: `Bearer ${selector.user.token}` },
//           },
//         );

//         const streamToken = response.data.token;
//         console.log("Stream token received successfully");

//         // Create user object
//         const user = {
//           id: userId,
//           name: appointment.patientId?.name || "Patient",
//         };

//         console.log("Creating StreamVideoClient...");

//         // Create client instance - use 'new' keyword
//         videoClient = new StreamVideoClient({
//           apiKey: import.meta.env.VITE_STREAM_API_KEY,
//           user: user,
//           token: streamToken,
//         });

//         console.log("StreamVideoClient created successfully");

//         // Create call instance
//         const videoCall = videoClient.call("default", callId);
//         console.log("Call instance created");

//         // Join the call
//         await videoCall.join();
//         console.log("Successfully joined the call");

//         if (isMounted) {
//           setClient(videoClient);
//           setCall(videoCall);
//           setIsLoading(false);
//         }
//       } catch (error) {
//         console.error("Failed to initialize meeting:", error);
//         if (isMounted) {
//           setError(
//             error.message || "Failed to join the meeting. Please try again.",
//           );
//           setIsLoading(false);
//         }
//       }
//     };

//     initializeCall();

//     // Cleanup function
//     return () => {
//       isMounted = false;
//       if (videoClient) {
//         try {
//           videoClient.disconnectUser();
//         } catch (err) {
//           console.error("Error during cleanup:", err);
//         }
//       }
//     };
//   }, [userId, callId, selector.user.token, appointment]);

//   // Error display
//   if (error) {
//     return (
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: "100vh",
//           padding: "20px",
//           textAlign: "center",
//         }}
//       >
//         <h2 style={{ color: "#dc2626", marginBottom: "16px" }}>
//           Error Joining Meeting
//         </h2>
//         <p style={{ color: "#6b7280", marginBottom: "24px" }}>{error}</p>
//         <button
//           onClick={() => navigate(-1)}
//           style={{
//             padding: "10px 24px",
//             fontSize: "16px",
//             cursor: "pointer",
//             backgroundColor: "#3b82f6",
//             color: "white",
//             border: "none",
//             borderRadius: "6px",
//             transition: "background-color 0.2s",
//           }}
//           onMouseEnter={(e) => (e.target.style.backgroundColor = "#2563eb")}
//           onMouseLeave={(e) => (e.target.style.backgroundColor = "#3b82f6")}
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   // Loading state
//   if (isLoading || !client || !call) {
//     return (
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: "100vh",
//         }}
//       >
//         <h2>Joining Meeting...</h2>
//         <p>Please wait while we connect you to the call</p>
//       </div>
//     );
//   }

//   // Meeting UI
//   return (
//     <StreamVideo client={client}>
//       <StreamCall call={call}>
//         <SpeakerLayout />
//         <CallControls />
//       </StreamCall>
//     </StreamVideo>
//   );
// }
import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  StreamVideo,
  StreamCall,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import axios from "axios";
import { useSelector } from "react-redux";
import VideoRender from "../components/DoctorDashboard/VideoRender";

export default function MeetingPage() {
  const { callId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const appointment = location.state;
  const selector = useSelector((state) => state.auth);

  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const userId = appointment?.patientId?._id;

  useEffect(() => {
    let videoClient;

    const init = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/appointment/stream/token/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${selector.user.token}`,
            },
          },
        );

        const token = res.data.token;

        const user = {
          id: userId,
          name: appointment.patientId?.name || "User",
        };

        videoClient = new StreamVideoClient({
          apiKey: import.meta.env.VITE_STREAM_API_KEY,
          user,
          token,
        });

        const videoCall = videoClient.call("default", callId);

        await videoCall.join();

        // ✅ IMPORTANT (fix mic/cam not working)
        await videoCall.camera.enable();
        await videoCall.microphone.enable();

        setClient(videoClient);
        setCall(videoCall);
        setLoading(false);
      } catch (err) {
        console.error(err);
        navigate("/");
      }
    };

    if (callId) init();

    return () => {
      videoClient?.disconnectUser();
    };
  }, [callId]);

  if (loading || !client || !call) {
    return (
      <div className="h-screen flex items-center justify-center">
        Joining meeting...
      </div>
    );
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <VideoRender />
      </StreamCall>
    </StreamVideo>
  );
}
