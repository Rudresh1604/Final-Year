export const allAppointment = [
  {
    patientName: "John Doe",
    dateTime: "2025-08-28T10:00:00",
    status: "Confirmed",
  },
  {
    patientName: "Jane Smith",
    dateTime: "2025-08-29T14:30:00",
    status: "Pending",
  },
  {
    patientName: "Michael Brown",
    dateTime: "2025-09-01T09:15:00",
    status: "Cancelled",
  },
  {
    patientName: "Emily Davis",
    dateTime: "2025-09-02T11:45:00",
    status: "Confirmed",
  },
  {
    patientName: "David Wilson",
    dateTime: "2025-09-03T16:00:00",
    status: "Pending",
  },
];

export const events = [
  {
    title: "Cardiology Appointment",
    start: "2025-08-28T10:00:00",
    end: "2025-08-28T11:00:00",
    extendedProps: { patient: "Dr. Orlando Diggs" },
  },
  {
    title: "Follow-up",
    start: "2025-08-28T11:00:00",
    end: "2025-08-28T12:00:00",
    extendedProps: { patient: "Dr. Natali Craig" },
  },
  {
    title: "Physical Therapy",
    start: "2025-08-28T14:00:00",
    end: "2025-08-28T15:00:00",
    extendedProps: { patient: "Dr. Sarah Wilson" },
  },
  {
    title: "Checkup",
    start: "2025-08-28T15:30:00",
    end: "2025-08-28T16:00:00",
    extendedProps: { patient: "Dr. Sarah Wilson" }, // ✅ same doctor → same color
  },
];
