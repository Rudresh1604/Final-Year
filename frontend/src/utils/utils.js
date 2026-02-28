import moment from "moment";

// Format date for display
export const formatDateDisplay = (dateString) => {
  return moment(dateString).format("MMM D, YYYY");
};

// Get day name from date
export const getDayName = (dateString) => {
  return moment(dateString).format("dddd");
};

export const formatTime = (dateString) => {
  return moment(dateString).format("hh:mm A");
};

export const combineDateAndTime = (date, timeString) => {
  const [hours, minutes] = timeString.split(":");
  const newDate = new Date(date);
  newDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  return newDate.toISOString();
};
