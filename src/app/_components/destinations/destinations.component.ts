import { UserService } from 'src/app/_services/user.service';
import { DataConverter } from './../../_converters/data.converter';
import { WageInfo } from './../../_models/wage-info.model';
import { DestinationsService } from './../../_services/destinations.service';
import { Destination } from './../../_models/destination.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
  destinationAnimation,
  newDestinationAnimation,
  destinationDimAnimation
} from 'src/app/_animations/destination.animation';
import { HttpService } from 'src/app/_services/http.service';
import { endPoint } from 'src/app/_config/end-points.config';
import { Data } from 'src/app/_tests/data.provider';
import { SessionToken } from 'src/app/_config/session.config';
import { DestinationDTO } from 'src/app/_dto/destination.dto';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/_services/employee.service';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss'],
  animations: [
    destinationAnimation,
    newDestinationAnimation,
    destinationDimAnimation
  ]
})
export class DestinationsComponent implements OnInit {
  destination: Destination = new Destination();
  destinations: Destination[] = [];
  // wages: WageInfo[] = [];

  destinationForm: FormGroup;
  wageForm: FormGroup;

  newDestinationTrigger = 'closed';
  animationTrigger = 'closed';

  edit = false;
  addButtonCaption = 'Add new';
  editButtonCaption = 'Edit';

  infoMessageShow = false;
  constructor(
    private destinationService: DestinationsService,
    private http: HttpService,
    private userService: UserService,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    console.log('init');

    this.destinationForm = new FormGroup({
      city: new FormControl(null, [
        Validators.required
        // Validators.pattern('^[A-Z][a-z][0-9]{2,30}$')
      ]),
      zipCode: new FormControl(null, [
        Validators.required
        // Validators.pattern('^[A-Z][0-9]{6, 20}$')
      ]),
      wage: new FormControl(null, [
        Validators.required
        // Validators.pattern('^[A-Z][0-9]{6, 20}$')
      ])
    });
    this.wageForm = new FormGroup({
      amount: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]{1,20}$')
      ])
    });
    
    const token = sessionStorage.getItem('userSession');
    const tokenData: SessionToken = JSON.parse(token);

    if (sessionStorage.getItem('userSession')) {
      // get destinations
      this.http
        .getDestinations(endPoint.baseUrl + endPoint.destinations)
        .subscribe(
          (res: DestinationDTO[]) => {
            this.destinationService.destinations = DataConverter.jsonToDestinations(
              res
            );
            this.destinations = this.destinationService.destinations;
          },
          err => {
            console.log('get destinations error ' + err.status);
            this.destinationService.destinations = DataConverter.jsonToDestinations(
              Data.destinations
            );
            this.destinations = this.destinationService.destinations;
            console.log(this.destinationService.destinations);
          }
        );
      }
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

  onDestination(index: number) {
    // this.wages = this.destinations[index].wages;
    this.destination = this.destinations[index];
    console.log(this.destination.id);
    this.animationTrigger = 'open';
    console.log(index);
  }
  onCloseDestination() {
    this.animationTrigger = 'closed';
  }

  onNewDestinations(input: HTMLInputElement) {
    this.newDestinationTrigger === 'closed'
      ? (this.newDestinationTrigger = 'open')
      : (this.newDestinationTrigger = 'closed');
    this.addButtonCaption === 'Add new'
      ? (this.addButtonCaption = 'Cancel')
      : (this.addButtonCaption = 'Add new');
    input.focus();
    this.destinationForm.reset();
    this.infoMessageShow = false;
  }

  onWageChange() {
    // set wage info with new date and amount
    const wageInfo = new WageInfo(
      null,
      this.formatDate(),
      null,
      this.wageForm.get('amount').value
    );
    this.setWageEndDate();
    // send request to save it

    this.http
      .changeWage(
        endPoint.baseUrl + endPoint.wage,
        DataConverter.wageInfoToJson(wageInfo)
      )
      .subscribe(
        res => {
          if (res.ok) {
            this.changeWageInView(wageInfo);
          }
          console.log(res.status);
        },
        err => {
          this.changeWageInView(wageInfo);

          console.log('error on wage change ' + err.status);
        }
      );
    this.wageForm.reset();
  }

  onSave() {
    const destination = new Destination(
      null,
      this.destinationForm.get('city').value,
      this.destinationForm.get('zipCode').value,
      this.destinationForm.get('wage').value,
      []
    );
    const wageInfo = new WageInfo(
      null,
      this.formatDate(),
      null,
      this.destinationForm.get('wage').value
    );
    this.http
      .saveDestination(
        endPoint.baseUrl + endPoint.destination,
        DataConverter.destinationToJson(destination)
      )
      .subscribe(
        res => {
          console.log(res.status);
        },
        err => {
          this.infoMessageShow = true;
          console.log('destination save ' + err);
        }
      );
    // save new wage info
    this.http
      .changeWage(
        endPoint.baseUrl + endPoint.wage,
        DataConverter.wageInfoToJson(wageInfo)
      )
      .subscribe(
        res => {
          if (res.ok) {
            this.changeWageInView(wageInfo);
          }
          console.log(res.status);
        },
        err => {
          // this.changeWageInView(wageInfo);
          console.log('error on wage change ' + err.status);
        }
      );
    console.log(destination);
    destination.wages.push(wageInfo);
    this.destinations.push(destination);
    this.newDestinationTrigger = 'closed';
    this.addButtonCaption === 'Add new'
      ? (this.addButtonCaption = 'Cancel')
      : (this.addButtonCaption = 'Add new');
    this.destinationForm.reset();
  }

  formatDate() {
    const date = new Date();
    return (
      date.getUTCDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
    );
  }

  setWageEndDate() {
    this.destinations.forEach(d => {
      if (d.id === this.destination.id) {
        d.wages[d.wages.length - 1].endDate = this.formatDate();
        // console.log(this.destinations);
        // console.log(d.id);
        this.http
          .changeWage(
            endPoint.baseUrl + endPoint.wage,
            DataConverter.wageInfoToJson(d.wages[d.wages.length - 1])
          )
          .subscribe(
            res => {
              if (res.ok) {
                // this.changeWageInView(wageInfo);
              }
              console.log(res.status);
            },
            err => {
              console.log('error on wage change old ' + err.status);
            }
          );
      }
    });
  }

  changeWageInView(wageInfo: WageInfo) {
    this.destinations.forEach(d => {
      if (d.id === this.destination.id) {
        d.currentWage = this.wageForm.get('amount').value;
        d.wages.push(wageInfo);
        console.log(this.destinations);
        console.log(d.id);
      }
    });
  }
}
