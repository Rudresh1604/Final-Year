import {
  useCallStateHooks,
  CallingState,
  ParticipantView,
} from "@stream-io/video-react-sdk";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function VideoRender() {
  const {
    useParticipants,
    useCallCallingState,
    useCameraState,
    useMicrophoneState,
  } = useCallStateHooks();

  const participants = useParticipants();
  const callingState = useCallCallingState();

  const camera = useCameraState();
  const microphone = useMicrophoneState();

  const navigate = useNavigate();
  const [sharing, setSharing] = useState(false);

  if (callingState !== CallingState.JOINED) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Connecting...
      </div>
    );
  }

  // ✅ Separate participants
  const local = participants.find((p) => p.isLocal);
  const remote = participants.filter((p) => !p.isLocal);

  const mainParticipant = remote[0] || local;

  return (
    <div className="h-screen w-full bg-black relative">
      {/* MAIN VIDEO */}
      <div className="absolute inset-0">
        {mainParticipant && <ParticipantView participant={mainParticipant} />}
      </div>

      {/* SELF VIDEO */}
      {local && (
        <div className="absolute bottom-24 right-4 w-52 h-36 border rounded overflow-hidden">
          <ParticipantView participant={local} />
        </div>
      )}

      {/* CONTROLS */}
      <div className="absolute bottom-0 w-full flex justify-center gap-5 pb-6">
        {/* MIC */}
        <button
          onClick={() => microphone.toggle()}
          className={`p-4 rounded-full text-white ${
            microphone.isEnabled ? "bg-gray-700" : "bg-red-500"
          }`}
        >
          {microphone.isEnabled ? "🎤" : "🔇"}
        </button>

        {/* CAMERA */}
        <button
          onClick={() => camera.toggle()}
          className={`p-4 rounded-full text-white ${
            camera.isEnabled ? "bg-gray-700" : "bg-red-500"
          }`}
        >
          {camera.isEnabled ? "📷" : "🚫"}
        </button>

        {/* SCREEN SHARE */}
        <button
          onClick={async () => {
            try {
              if (!sharing) {
                await camera.startScreenShare();
              } else {
                await camera.stopScreenShare();
              }
              setSharing(!sharing);
            } catch (err) {
              console.error(err);
            }
          }}
          className="p-4 rounded-full bg-gray-700 text-white"
        >
          {sharing ? "🛑" : "📺"}
        </button>

        {/* END CALL */}
        <button
          onClick={async () => {
            navigate("/");
          }}
          className="p-4 rounded-full bg-red-600 text-white"
        >
          ❌
        </button>
      </div>
    </div>
  );
}
