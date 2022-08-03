export const parseDate = (date: number): string => {
  const [hours, minutes] = new Date(date).toTimeString().split(":");
  return `${hours}:${minutes}`;
};

export const dailyTimeSlots = (
  openTime?: number,
  closeTime?: number
): Array<number> => {
  if (!openTime || !closeTime) {
    return [];
  }
  const totalSlots = (closeTime - openTime) * 2;
  const startTime = new Date().setHours(openTime, 0, 0, 0);
  const increment = 30 * 60 * 1000;
  return Array(totalSlots)
    .fill([startTime])
    .reduce((acc, _, i) => acc.concat([startTime + i * increment]));
};

export const weeklyDateValues = (startDate?: Date): Array<number> => {
  if (!startDate) {
    return [];
  }
  const midnight = new Date(startDate).setHours(0, 0, 0, 0);
  const increment = 24 * 60 * 60 * 1000;
  return Array(7)
    .fill([midnight])
    .reduce((acc, _, i) => acc.concat([midnight + i * increment]));
};

export const toShortDate = (timestamp: any) => {
  const [day, , dayOfMonth] = new Date(timestamp).toDateString().split(" ");
  return `${day} ${dayOfMonth}`;
};

export const mergeDateAndTime = (date: number, timeSlot: number) => {
  const time = new Date(timeSlot);
  const test = new Date(date).setHours(
    time.getHours(),
    time.getMinutes(),
    time.getSeconds(),
    time.getMilliseconds()
  );
  return test;
};

export const getRandomAvailableSlots = (
  openTime?: number,
  closeTime?: number
) => {
  if (!openTime || !closeTime) {
    return [];
  }
  const totalSlots = (closeTime - openTime) * 2 * 7;
  const availableSlotsCount = Math.floor(Math.random() * totalSlots);
  let result = [];
  for (let i = 0; i < availableSlotsCount; i++) {
    const day = Math.floor(Math.random() * 8) * 24;
    const hours = Math.floor(Math.random() * 19);
    const minutes = Math.random() < 0.5 ? 0 : 30;
    result.push({ startsAt: new Date().setHours(hours + day, minutes, 0, 0) });
  }
  return result;
};
