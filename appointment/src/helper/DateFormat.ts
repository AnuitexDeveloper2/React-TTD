export const parseDate = (date: number) => {
  const [hours, minutes] = new Date(date).toTimeString().split(":");
  return `${hours}:${minutes}`;
};
