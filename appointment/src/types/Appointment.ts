export interface Customer {
  firstName: string;
  lastName?: string;
  phone?: string;
}

export interface AppointmentItem {
  startsAt: number;
  customer: Customer;
  phone?: string;
  notes?: string;
}
