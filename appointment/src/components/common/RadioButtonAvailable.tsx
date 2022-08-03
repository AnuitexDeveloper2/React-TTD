import React from "react";
import { mergeDateAndTime } from "../../helper/DateHelper";

interface Props {
  availableTimeSlots?: { startsAt: number }[];
  date: any;
  timeSlot: any;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButtonAvailable: React.FC<Props> = ({
  availableTimeSlots,
  date,
  timeSlot,
  handleChange,
}) => {
  const startsAt = mergeDateAndTime(date, timeSlot);

  if (
    availableTimeSlots?.some(
      (availableTimeSlot) => availableTimeSlot.startsAt === startsAt
    )
  ) {
    return (
      <input
        name="startsAt"
        type="radio"
        value={startsAt}
        id={startsAt.toString()}
        onChange={handleChange}
      />
    );
  }
  return null;
};

export default RadioButtonAvailable;
