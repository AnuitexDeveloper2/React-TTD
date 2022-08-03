import React, { useCallback, useState } from "react";
import TimeSlotTable from "./TimeSlotTable";

interface Props {
  selectableServices?: Array<string>;
  service?: string;
  onSubmit?: (service: string, timeSlot: string) => void;
  salonOpensAt?: number;
  salonClosesAt?: number;
  today?: Date;
  availableSlots?: { startsAt: number }[];
}
const AppointmentForm: React.FC<Props> = ({
  selectableServices = [
    "Cut",
    "Blow-dry",
    "Cut & color",
    "Beard trim",
    "Cut & beard trim",
    "Extensions",
  ],
  onSubmit,
  service = "",
  salonOpensAt,
  salonClosesAt,
  today,
  availableSlots = [],
}) => {
  const [state, setState] = useState({ service: service, startsAt: "" });

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setState({ ...state, [event.currentTarget.name]: event.target.value });
  };

  return (
    <form
      id="appointment"
      name="appointment"
      onSubmit={
        onSubmit
          ? (e) => {
              e.preventDefault();
              onSubmit(state.service, state.startsAt);
            }
          : undefined
      }
    >
      <div className="appointment-form-container">
        <div>
          <div className="appointment-selector-container">
            <label htmlFor="appointment" id="appointment-label">
              Our services
              {state.startsAt}
            </label>
            <select
              name="service"
              value={state.service}
              onChange={handleChange}
            >
              {selectableServices.map((service) => (
                <option key={service}>{service}</option>
              ))}
            </select>
          </div>
          <TimeSlotTable
            salonOpensAt={salonOpensAt}
            salonClosesAt={salonClosesAt}
            today={today}
            availableSlots={availableSlots}
            handleChange={handleChange}
          />
          <div className="appointment-submit-wrapper">
            <input
              type="submit"
              name={"appointment-submit-button"}
              value="Add"
              disabled={!state.startsAt}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AppointmentForm;
