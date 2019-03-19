import * as employee from '../_tests/employee.json';
import * as destinations from '../_tests/destinations.test.json';
import * as businessTrips from '../_tests/business-trips.test.json';
import * as employeesOnTrip from '../_tests/employees.test.json';
import * as statuses from '../_tests/statuses.test.json';
import * as roles from '../_tests/roles.test.json';

export class Data {
  static employee = employee.default;
  static destinations = destinations.default;
  static businessTrips = businessTrips.default;
  static employeesOnTrip = employeesOnTrip.default;
  static statuses = statuses.default;
  static roles = roles.default;
}
