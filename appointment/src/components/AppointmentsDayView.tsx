import React, { useState } from "react";
import Appointment from "./Appointment";
import { AppointmentItem } from "../types/Appointment";

import "./index.scss";
import { parseDate } from "../helper/DateFormat";

const AppointmentsDayView: React.FC<{ appointments: AppointmentItem[] }> = ({
  appointments,
}) => {
  const [state, setState] = useState(0);

  const handleSelect = (index: number) => {
    setState(index);
  };
  return (
    <div className="app-wrapper">
      <div id="appointmentsDayView">
        <ol>
          {appointments.map((appointment, index) => (
            <li key={index} className="appointment-item">
              <button type="button" onClick={() => handleSelect(index)}>
                {parseDate(appointment.startsAt)}
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className="appointment-details">
        {appointments.length ? (
          <Appointment
            appointment={appointments[state]}
            key={appointments[state].startsAt}
          />
        ) : (
          <p>There are no appointments today</p>
        )}
      </div>
    </div>
  );
};

export default AppointmentsDayView;
