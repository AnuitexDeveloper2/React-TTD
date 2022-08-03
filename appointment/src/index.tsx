import * as React from "react";
import ReactDOM from "react-dom";
import AppointmentsDayView from "./components/AppointmentsDayView";
import CustomerForm from "./components/common/CustomerForm";
import { sampleAppointments } from "./sampleData/SampleAppointments";
import AppointmentForm from "./components/common/AppointmentForm";

import "./index.scss";
import { getRandomAvailableSlots, toShortDate } from "./helper/DateHelper";

const handleSubmit = (service: string, timeSlot: string) => {
  const dayOfWeek = toShortDate(+timeSlot);
  alert(`You ordered ${service} ${new Date(+timeSlot).toTimeString().substring(0, 5)} on ${dayOfWeek}`);
};

ReactDOM.render(
  <AppointmentForm
    service="Blow-dry"
    salonOpensAt={9}
    salonClosesAt={19}
    availableSlots={getRandomAvailableSlots(9, 19)}
    today={new Date()}
    onSubmit={handleSubmit}
  />,
  document.getElementById("root")
);
