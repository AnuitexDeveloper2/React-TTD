import React, { useState } from "react";
import Appointment from "./Appointment";
import { AppointmentItem } from "./types/Appointment";

const AppointmentsDayView: React.FC<{ appointments: AppointmentItem[] }> = ({
  appointments,
}) => {
  const [state, setState] = useState(0);

  const parseDate = (date: number) => {
    const [hours, minutes] = new Date(date).toTimeString().split(":");
    return `${hours}:${minutes}`;
  };

  const handleSelect = (index: number) => {
    setState(index);
  };
  return (
    <div id="appointmentsDayView">
      <ol>
        {appointments.map((appointment, index) => (
          <li key={index}>
            <button type="button" onClick={() => handleSelect(index)}>
              {parseDate(appointment.startsAt)}
            </button>
          </li>
        ))}
      </ol>
      {appointments.length ? (
        <Appointment
          appointment={appointments[state]}
          key={appointments[state].startsAt}
        />
      ) : (
        <p>There are no appointments today</p>
      )}
    </div>
  );
};

export default AppointmentsDayView;
