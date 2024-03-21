export function extractTime(dateString) {
  const date = new Date(dateString);
  const getHours = padZero(date.getHours());
  const getMinutes = padZero(date.getMinutes());
  return `${getHours}:${getMinutes}`;
}

function padZero(date) {
  return date.toString().padStart("2", "0");
}
