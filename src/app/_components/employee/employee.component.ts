import { UserService } from 'src/app/_services/user.service';
import { endPoint } from 'src/app/_config/end-points.config';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TripStatus } from './../../_models/tripStatus.model';
import { BillItem } from './../../_models/bill-item.model';
import { BusinessTrip } from './../../_models/business-trip.model';
import {
  businessTripAnimation,
  employeeAnimation
} from './../../_animations/business-trip.animation';
import { EmployeeService } from '../../_services/employee.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { Employee } from 'src/app/_models/employee.model';

import { HttpService } from 'src/app/_services/http.service';
import { Router } from '@angular/router';
import { Bill } from 'src/app/_models/bill.model';
import { Status } from 'src/app/_models/status.model';
import { StatusDTO } from 'src/app/_dto/status.dto';
import { DataConverter } from 'src/app/_converters/data.converter';
import { Data } from 'src/app/_tests/data.provider';
import { SessionToken } from 'src/app/_config/session.config';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  animations: [businessTripAnimation, employeeAnimation]
})
export class EmployeeComponent implements OnInit {
  statusForm: FormGroup;

  statuses: Status[] = [];
  employee: Employee = new Employee();
  currentBusinessTrip: BusinessTrip = new BusinessTrip();
  currentBusinessTripTotalBill = 0;
  currentBusinessTripBillItemsTotal = [];

  // animation trigger
  businessTripTrigger = 'closed';

  color = 'red';

  constructor(
    private employeeService: EmployeeService,
    private http: HttpService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    console.log(this.employeeService.employee.ide)
    const token = sessionStorage.getItem('userSession');
    const tokenData: SessionToken = JSON.parse(token);
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
      this.employee = this.employeeService.employee;
      this.currentBusinessTrip = this.employee.businessTrips[0];
    } else {
      this.employee = this.employeeService.employee;
      this.currentBusinessTrip = this.employee.businessTrips[0];
    }

    // total business trip expense
    this.billItemsTotal();
    this.businessTripTotal();
    //////////////////////////////
    // statusForm init
    this.statusForm = new FormGroup({
      status: new FormControl(Validators.required)
    });

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
  }

  changeStatus() {
    const i = this.statusForm.get('status').value;
    const status = new TripStatus(i, this.statuses[i - 1].name);

    console.log(status);
  }

  onBusinessTrip(businessTrip: BusinessTrip) {
    this.currentBusinessTrip = businessTrip;
    // this.status = businessTrip.status;
    this.businessTripTrigger = 'open';
    this.color = this.statusColor(businessTrip.status);
  }
  onCloseBusinessTrip() {
    this.businessTripTrigger = 'closed';
  }

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
    if (status === 'ongoing') {
      color = '#007bff';
    } else if (status === 'upcoming') {
      color = '#ffc107';
    } else if (status === 'finished') {
      color = '#28a745';
    } else if (status === 'canceled') {
      color = '#dc3545';
    }
    return color;
  }

  selectStatus(status: string) {
    // this.status = status;
    // console.log(this.status);
    console.log(this.statusForm);
  }

  dateFormater(date: Date) {}

  billItemsTotal() {
    // get sum of bill items
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.currentBusinessTrip.bills.length; i++) {
      // tslint:disable-next-line:prefer-for-of
      let sum = 0;
      // tslint:disable-next-line:prefer-for-of
      for (
        let j = 0;
        j < this.currentBusinessTrip.bills[i].billItems.length;
        j++
      ) {
        sum += this.currentBusinessTrip.bills[i].billItems[j].cost;
      }
      this.currentBusinessTripBillItemsTotal.push(sum);
    }
  }

  businessTripTotal() {
    for (const b of this.currentBusinessTripBillItemsTotal) {
      this.currentBusinessTripTotalBill += b;
    }
    this.currentBusinessTripTotalBill += this.currentBusinessTrip.destination.currentWage;
  }
}
