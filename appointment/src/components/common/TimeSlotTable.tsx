import React from "react";
import {
  dailyTimeSlots,
  mergeDateAndTime,
  toShortDate,
  weeklyDateValues,
} from "../../helper/DateHelper";
import RadioButtonAvailable from "./RadioButtonAvailable";

import "./index.scss";

interface Props {
  salonOpensAt?: number;
  salonClosesAt?: number;
  today?: Date;
  availableSlots?: { startsAt: number }[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TimeSlotTable: React.FC<Props> = ({
  salonOpensAt,
  salonClosesAt,
  today,
  availableSlots,
  handleChange
}) => {
  const toTimeValue = (timestamp: number) =>
    new Date(timestamp).toTimeString().substring(0, 5);

  const dates = weeklyDateValues(today);
  const timeSlots = dailyTimeSlots(salonOpensAt, salonClosesAt);
  return (
    <div>
      <table id="time-slot">
        <thead>
          <tr>
            <th></th>
            {dates.map((date) => {
              return <th key={date}>{toShortDate(date)}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {salonOpensAt &&
            salonClosesAt &&
            timeSlots.map((timeSlot) => (
              <tr key={timeSlot}>
                <th>{toTimeValue(timeSlot)}</th>
                {dates.map((date) => (
                  <td key={date}>
                    <div>
                      <RadioButtonAvailable
                        date={date}
                        availableTimeSlots={availableSlots}
                        timeSlot={timeSlot}
                        handleChange={handleChange}
                      />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeSlotTable;
