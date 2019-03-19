
import { BusinessTrip } from './business-trip.model';

export class Employee {
  constructor(
    public ide?: number,
    public firstname?: string,
    public lastname?: string,
    public email?: string,
    public username?: string,
    public role?: number,
    public businessTrips?: BusinessTrip[]
  ) {}
}
