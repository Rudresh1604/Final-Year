import React from "react";

const MeetingCard = ({ appointment }) => {
  const now = new Date();
  const start = new Date(appointment.time);
  const end = new Date(appointment.endTime);

  const isLive = now >= start && now <= end;
  const isUpcoming = now < start;
  const isEnded = now > end;

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 text-center space-y-4">

      <h3 className="text-lg font-semibold text-gray-800">
        Video Consultation
      </h3>
      <h2>
        {appointment.reason}
      </h2>

      <p className="text-gray-500 text-sm">
        {formatTime(appointment.time)} - {formatTime(appointment.endTime)}
      </p>

      {/* LIVE */}
      {isLive && (
        <>
          <div className="flex justify-center items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <p className="text-green-600 font-medium">Consultation Live</p>
          </div>

          <a
            // href={appointment.meetingLink}
            target="_blank"
            rel="noreferrer"
            className="block w-full sm:w-auto mx-auto bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-medium hover:opacity-90 transition"
          >
            Join Now
          </a>
        </>
      )}

      {/* UPCOMING */}
      {isUpcoming && (
        <>
          <p className="text-gray-600">
            Your consultation starts at {formatTime(appointment.time)}
          </p>

          <button
            disabled
            className="w-full sm:w-auto bg-gray-300 text-gray-600 px-6 py-3 rounded-xl cursor-not-allowed"
          >
            Join Available at Start Time
          </button>
        </>
      )}

      {/* ENDED */}
      {isEnded && (
        <p className="text-gray-500 font-medium">
          This consultation has ended.
        </p>
      )}
    </div>
  );
};

export default MeetingCard;