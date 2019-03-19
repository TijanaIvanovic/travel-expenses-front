import { Status } from './../_models/status.model';
import { StatusDTO } from './../_dto/status.dto';
import { BusinessTripDTO } from './../_dto/business-trip.dto';
import { BusinessTrip } from './../_models/business-trip.model';
import { WageInfoDTO } from './../_dto/wage-info.dto';
import { WageInfo } from './../_models/wage-info.model';
import { Destinations } from './../_models/destinations.model';
import { DestinationsDTO } from './../_dto/destinations.dto';
import { MsgDTO } from './../_dto/msg.dto';
import { UserCredentialsDTO } from './../_dto/user-credentials.dto';
import { EmployeeDTO } from './../_dto/employee.dto';
import { Employee } from '../_models/employee.model';
import { User } from '../_models/user.model';
import { RegisterUserDataDTO } from '../_dto/register-data.dto';
import { RegisterUserData } from '../_models/register-data.model';
import { Destination } from '../_models/destination.model';
import { DestinationDTO } from '../_dto/destination.dto';
import { CredentialsChange } from '../_models/credentials-change.model';
import { CredentialsChangeDTO } from '../_dto/credentials-change.dto';
import { Role } from '../_models/role.model.';
import { RoleDTO } from '../_dto/role.dto.';

export class DataConverter {
  // converts user login data to JSON
  static userCredentialsToJson(model: User): UserCredentialsDTO {
    return {
      username: model.username,
      password: model.password
    };
  }

  // converts user register data to JSON
  static registerUserDataToJson(model: RegisterUserData): RegisterUserDataDTO {
    return {
      username: model.username,
      password: model.password,
      firstname: model.firstname,
      lastname: model.lastname
    };
  }

  // converts JSON to Employee and returns Employee object
  static jsonToEmployee(json: EmployeeDTO): Employee {
    return new Employee(
      json.ide,
      json.firstname,
      json.lastname,
      json.email,
      json.username,
      json.role,
      json.businessTrips
    );
  }

  // convert Employee object to JSON data and returns it
  static employeeToJson(model: Employee): EmployeeDTO {
    return {
      ide: model.ide,
      firstname: model.firstname,
      lastname: model.lastname,
      email: model.email,
      username: model.username,
      role: model.role,
      businessTrips: model.businessTrips
    };
  }

  // employees on business trip
  static jsonToTripEmployees(json:EmployeeDTO[]):Employee[]{
    const employees = [];
    json.forEach(e => {
      employees.push(new Employee(e.ide, e.firstname, e.lastname, e.email, null, e.role));
    });
    return employees;
  }
  // convert JSON data to Destinations
  static jsonToDestinations(json: DestinationDTO[]): Destination[] {
    const destinations: Destination[] = [];
    json.forEach(d => {
      destinations.push(
        new Destination(d.id, d.city, d.zipCode, d.currentWage, d.wages)
      );
    });
    return destinations;
  }
  // convert JSON data to one Destination
  static destinationToJson(model: Destination): DestinationDTO {
    return {
      city: model.city,
      zipCode: model.zipCode,
      currentWage: model.currentWage
    };
  }
// json to b=array of business trips
  static jsonToBusinessTrips(json: BusinessTripDTO[]): BusinessTrip[] {
    const businessTrips: BusinessTrip[] = [];
    json.forEach(b => {
      businessTrips.push(
        new BusinessTrip(b.id, b.destination, b.startDate, b.endDate, b.bills, b.status)
      );
    });
    return businessTrips;
  }

static businessTripToJson(model: BusinessTrip): BusinessTripDTO{
  return {
    id:model.id,
    destination:model.destination,
    startDate:model.startDate,
    endDate:model.endDate
  }
}
  // conver wage info data to json
  static wageInfoToJson(model: WageInfo): WageInfoDTO {
    return {
      id: model.id,
      startDate: model.startDate,
      endDate: model.endDate,
      amount: model.amount
    };
  }

  static credentialsChangeToJson(
    model: CredentialsChange
  ): CredentialsChangeDTO {
    return {
      username: model.username,
      email: model.email,
      newPassword: model.newPassword,
      password: model.password
    };
  }
// convert json to array of statuses
  static jsonToStatuses(json: StatusDTO[]): Status[]{
    const statuses = [];
    json.forEach(s => {
      statuses.push(new Status(s.id, s.name));
    });
    return statuses;
  }

  static jsonToRoles(json: RoleDTO[]): Role[]{
    const roles = [];
    json.forEach(s => {
      roles.push(new Role(s.id, s.name));
    });
    return roles;
  }
  // static jsontotest(json: any): Msg {
  //   return new Msg(json.msg);
  // }
  // static testtojson(model: User): UserCredentialsDTO {
  //   return {
  //     username: model.username,
  //     password: model.password
  //   };
  // }
}
