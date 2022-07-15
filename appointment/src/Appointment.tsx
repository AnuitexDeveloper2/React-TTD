import React from "react";
import { AppointmentItem } from "./types/Appointment";

interface Props {
  appointment: AppointmentItem;
}

const Appointment: React.FC<Props> = ({ appointment }) => {
 
  return <>{appointment.customer.firstName}</>;
};

export default Appointment;
