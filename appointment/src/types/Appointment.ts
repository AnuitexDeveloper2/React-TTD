export interface Customer {
  firstName: string;
}

export interface AppointmentItem {
  startsAt: number;
  customer: Customer;
}
