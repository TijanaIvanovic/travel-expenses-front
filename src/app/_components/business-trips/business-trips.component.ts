import { WageInfo } from './../../_models/wage-info.model';
import { DestinationDTO } from 'src/app/_dto/destination.dto';
import { Destination } from './../../_models/destination.model';
import { BusinessTripDTO } from './../../_dto/business-trip.dto';
import { BusinessTrip } from './../../_models/business-trip.model';
import { HttpService } from './../../_services/http.service';
import { Component, OnInit } from '@angular/core';
import {
  employeeAnimation,
  businessTripAnimation,
  newBusinessTripAnimation
} from 'src/app/_animations/business-trip.animation';
import { endPoint } from 'src/app/_config/end-points.config';
import { DataConverter } from 'src/app/_converters/data.converter';
import { Data } from 'src/app/_tests/data.provider';
import { Employee } from 'src/app/_models/employee.model';
import { EmployeeDTO } from 'src/app/_dto/employee.dto';
import { FormGroup, FormControl } from '@angular/forms';
import { Status } from 'src/app/_models/status.model';
import { StatusDTO } from 'src/app/_dto/status.dto';
import { EmployeeService } from 'src/app/_services/employee.service';
import { SessionToken } from 'src/app/_config/session.config';

@Component({
  selector: 'app-business-trips',
  templateUrl: './business-trips.component.html',
  styleUrls: ['./business-trips.component.scss'],
  animations: [
    employeeAnimation,
    businessTripAnimation,
    newBusinessTripAnimation
  ]
})
export class BusinessTripsComponent implements OnInit {
  newBusinessTripForm: FormGroup;
  currentBusinessTrip: BusinessTrip = new BusinessTrip();
  currentBusinessTripNO = 0;
  businessTrips: BusinessTrip[] = [];
  employeesOnTrip: Employee[] = [];
  destinations: Destination[] = [];
  destination: Destination = new Destination();
  statuses: Status[] = [];

  animationTrigger = 'closed';
  newTripAnimationTrigger = 'closed';

  constructor(private http: HttpService, private employeeService:EmployeeService) {}

  ngOnInit() {
    const token = sessionStorage.getItem('userSession');
    const tokenData: SessionToken = JSON.parse(token);
    // new business trip form
    this.newBusinessTripForm = new FormGroup({
      destination: new FormControl(),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      status: new FormControl()
    });
    // get business trips
    this.http
      .getBusinessTrips(endPoint.baseUrl + endPoint.businessTrips)
      .subscribe(
        (res: BusinessTripDTO[]) => {
          this.businessTrips = DataConverter.jsonToBusinessTrips(res);
        },
        err => {
          console.log('error on business trips get ' + err.status);
          this.businessTrips = DataConverter.jsonToBusinessTrips(
            Data.businessTrips
          );
        this.currentBusinessTrip = this.businessTrips[0];

          console.log(this.businessTrips);
        }
      );
    

    // get statuses
    this.http.getStatuses(endPoint.baseUrl + endPoint.statuses).subscribe(
      (res: StatusDTO[]) => {
        this.statuses = DataConverter.jsonToStatuses(res);
      },
      err => {
        console.log('error on destination get ' + err.status);
        this.statuses = DataConverter.jsonToStatuses(Data.statuses);
        console.log(this.statuses);
      }
    );
    

    // login in case of reload
    if(this.employeeService.employee.ide === undefined && token) {
      console.log('ok')
      this.http
      .loginByID(
        endPoint.baseUrl + endPoint.login + tokenData.uid
      )
      .subscribe(
        res => {
          this.employeeService.employee = DataConverter.jsonToEmployee(res);
        },
        err => {
          console.log('http error on login by id ' + err.status);
          this.employeeService.employee = DataConverter.jsonToEmployee(
            Data.employee
          );
          console.log(this.employeeService.employee);
        }
      );
    } 
  }

  onBusinessTrip(index: number) {
    this.animationTrigger = 'open';
    this.currentBusinessTrip = this.businessTrips[index];
    console.log(this.businessTrips[index]);
    // get all employees on business trip using current business trip id
    this.http
      .getEmployeesOnTrip(
        endPoint.baseUrl + endPoint.employee + this.currentBusinessTrip.id
      )
      .subscribe(
        (res: EmployeeDTO[]) => {
          // this.employeesOnTrip = DataConverter.jsonToTripEmployees(res);
        },
        err => {
          console.log('error on get employees on business trip ' + err.status);
          this.employeesOnTrip = DataConverter.jsonToTripEmployees(
            Data.employeesOnTrip
          );
        }
      );
    this.currentBusinessTripNO = index + 1;
    console.log(index);
  }

  onCloseBusinessTrip() {
    if (this.animationTrigger === 'open') {
      this.animationTrigger = 'closed';
    }
    if (this.newTripAnimationTrigger === 'open') {
      this.newTripAnimationTrigger = 'closed';
      this.newBusinessTripForm.reset();
    }
  }

  onNewBusinessTrip() {
    // get all destinations
    this.http
      .getDestinations(endPoint.baseUrl + endPoint.destinations)
      .subscribe(
        (res: DestinationDTO[]) => {
          this.destinations = DataConverter.jsonToDestinations(res);
        },
        err => {
          console.log('error on destination get ' + err.status);
          this.destinations = DataConverter.jsonToDestinations(
            Data.destinations
          );
        }
      );

    // open dialog
    this.newTripAnimationTrigger = 'open';
    console.log(this.newTripAnimationTrigger);
  }

  // submit new business trip
  save() {
    const index = this.newBusinessTripForm.get('destination').value;
    console.log(index);
    console.log(this.destinations[index]);
    const businessTrip: BusinessTrip = new BusinessTrip(
      null,
      this.destinations[index],
      this.formatDate(this.newBusinessTripForm.get('startDate').value),
      this.formatDate(this.newBusinessTripForm.get('endDate').value),
      null,
      this.newBusinessTripForm.get('status').value
    );
    // console.log(this.newBusinessTripForm.get('status').value);
    // post to server
    this.http
      .saveBusinessTrip(
        endPoint.baseUrl + endPoint.businessTrip,
        DataConverter.businessTripToJson(businessTrip)
      )
      .subscribe(
        res => {
          if (res.ok) {
            console.log('ok on business trip save');
          }
        },
        err => {
          this.businessTrips.push(businessTrip);
          console.log('error on business trip save ' + err.status);
        }
      );
    this.newBusinessTripForm.reset();
    this.newTripAnimationTrigger = 'closed';
    console.log(
      this.businessTrips[this.businessTrips.length - 1].destination.currentWage
    );
  }

  // select destination from option manu and wages
  onDestinationSelect(index: number) {
    console.log(index);
    this.destination = this.destinations[2];
  }
  // set status color by status type
  statusColor(status?: number, select?: HTMLOptionElement) {
    // in case of option select
    if (select) {
      select.style.color = this.colorPick(status);
    } else {
      // any other case
      return this.colorPick(status);
    }
  }

  colorPick(status) {
    let color;
    if (status === 1) {
      color = '#007bff';
    } else if (status === 2) {
      color = '#ffc107';
    } else if (status === 3) {
      color = '#28a745';
    } else if (status === 4) {
      color = '#dc3545';
    }
    return color;
  }

  formatDate(datePick: string) {
    const date = new Date(datePick);
    return (
      date.getUTCDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
    );
  }
}
