import { BusinessTripDTO } from './business-trip.dto';

export interface EmployeeDTO {
  ide?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  username?: string;
  role?: number;
  businessTrips?: BusinessTripDTO[];
}
