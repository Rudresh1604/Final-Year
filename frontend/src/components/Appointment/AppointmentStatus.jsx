const AppointmentStatusButton = ({ status, time, endTime }) => {
  const getAppointmentStatus = () => {
    if (status !== "Scheduled") return null;

    const now = new Date();
    const appointmentTime = new Date(time);
    const appointmentEndTime = new Date(endTime);

    if (now > appointmentEndTime) {
      return {
        text: "Completed",
        style: "bg-gray-400 text-white cursor-not-allowed",
        disabled: true,
      };
    } else if (now >= appointmentTime && now <= appointmentEndTime) {
      return {
        text: "Join Now",
        style: "bg-green-600 text-white hover:bg-green-700",
        disabled: false,
      };
    } else if (now < appointmentTime) {
      return {
        text: "Upcoming...",
        style: "bg-blue-600 text-white hover:bg-blue-700",
        disabled: false,
      };
    }

    return null;
  };

  const appointmentStatus = getAppointmentStatus();

  if (!appointmentStatus) return null;

  return (
    <button
      className={`px-4 py-2 rounded-md font-medium text-center transition-colors ${appointmentStatus.style}`}
      disabled={appointmentStatus.disabled}
    >
      {appointmentStatus.text}
    </button>
  );
};

export default AppointmentStatusButton;
