import { Destination } from './destination.model';
import { Bill } from './bill.model';
import { Employee } from './employee.model';

export class BusinessTrip {
  constructor(
    public id?: number,
    public destination?: Destination,
    public startDate?: string,
    public endDate?: string,
    public bills?: Bill[],
    public status?: number
  ) {}
}
