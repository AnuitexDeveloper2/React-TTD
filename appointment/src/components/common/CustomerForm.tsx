import React, { ChangeEvent, useState } from "react";
import { Customer } from "../../types/Appointment";

import "./index.scss"

interface Props {
  firstName?: string;
  lastName?: string;
  phone?: string;
  onSubmit?: (customer: Customer) => void;
}
const CustomerForm: React.FC<Props> = ({
  firstName,
  lastName,
  phone,
  onSubmit,
}) => {
  const [customer, setCustomer] = useState<Customer>({
    firstName: firstName || "",
    lastName: lastName || "",
    phone: phone || "",
  });
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomer({
      ...customer,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  return (
    <div className="form-container">
      <form
        id="customer"
        onSubmit={onSubmit ? () => onSubmit(customer) : undefined}
        className="customer-form"
      >
        <label htmlFor="firstName">First Name</label>
        <input
          readOnly
          id="firstName"
          name="firstName"
          type="text"
          className="customer-input"
          value={customer.firstName}
          onChange={handleChange}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          readOnly
          id="lastName"
          name="lastName"
          type="text"
          className="customer-input"
          value={customer.lastName}
          onChange={handleChange}
        />

        <label htmlFor="phone">Phone Number</label>
        <input
          readOnly
          id="phone"
          name="phone"
          type="text"
          className="customer-input"
          value={customer.phone}
        />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};

export default CustomerForm;
