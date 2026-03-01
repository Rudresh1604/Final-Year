// In your lib/assignColors.js file
export const assignRandomColors = (events) => {
  if (!events || !Array.isArray(events) || events.length === 0) {
    return [];
  }

  const colors = [
    "#3788d8",
    "#41b883",
    "#e9692c",
    "#9b59b6",
    "#3498db",
    "#e74c3c",
    "#f1c40f",
    "#1abc9c",
    "#2ecc71",
    "#e67e22",
    "#e84342",
    "#6c5ce7",
  ];

  return events.map((event, index) => {
    // Ensure we preserve the Date objects
    return {
      ...event,
      // Make sure start and end are Date objects
      start: event.start instanceof Date ? event.start : new Date(event.start),
      end: event.end instanceof Date ? event.end : new Date(event.end),
      backgroundColor: colors[index % colors.length],
      borderColor: "transparent",
      textColor: "#FFFFFF",
    };
  });
};
