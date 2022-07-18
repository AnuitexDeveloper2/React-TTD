import React from "react";
import { parseDate } from "../helper/DateFormat";
import { AppointmentItem } from "../types/Appointment";
import AppointmentDetail from "./AppointmentDetail";

// import "./index.scss";

interface Props {
  appointment: AppointmentItem;
}

const Appointment: React.FC<Props> = ({ appointment }) => {
  return (
    <div className="appointment-container">
      <strong className="appointment-date">Today's appointment at {parseDate(appointment.startsAt)}</strong>
      <AppointmentDetail title="Customer" content={appointment.customer.firstName}/>
    </div>
  );
};

export default Appointment;
