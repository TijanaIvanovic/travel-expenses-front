import { Data } from 'src/app/_tests/data.provider';
import { DataConverter } from './../../_converters/data.converter';
import { HttpService } from 'src/app/_services/http.service';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/_services/employee.service';
import { User } from 'src/app/_models/user.model';
import { Employee } from 'src/app/_models/employee.model';
import {
  formAnimation,
  infoDimAnimation
} from '../../_animations/credentials.animation';
import { CredentialsChange } from 'src/app/_models/credentials-change.model';
import { endPoint } from 'src/app/_config/end-points.config';
import { SessionToken } from 'src/app/_config/session.config';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss'],
  animations: [formAnimation, infoDimAnimation]
})
export class CredentialsComponent implements OnInit {
  credentials: User;
  credentialsChange: CredentialsChange;
  employee: Employee;
  changeButtonCaption = 'Change';
  credentialsFormShow = false;
  animationTrigger = 'closed';
  username = false;
  email = false;
  newPassword = false;
  credentialsFrom: FormGroup;
  infoMessageShow = false;

  constructor(
    private userService: UserService,
    private employeeService: EmployeeService,
    private http: HttpService
  ) {}

  ngOnInit() {
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
    } 

    this.credentials = this.userService.userCredentials;
    this.employee = this.employeeService.employee;
    // form init
    this.credentialsFrom = new FormGroup({
      username: new FormControl(),
      newPassword: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
    });
  }

  onSave() {
    // take values from form and instantiate new object with them by passing them as constructor parameters
    this.credentialsChange = new CredentialsChange(
      this.credentialsFrom.get('username').value === null
        ? this.userService.userCredentials.username
        : this.credentialsFrom.get('username').value,
      this.credentialsFrom.get('email').value,
      this.credentialsFrom.get('newPassword').value,
      this.credentialsFrom.get('password').value
    );

    this.http
      .changeCredentials(
        endPoint.changeCredentials,
        DataConverter.credentialsChangeToJson(this.credentialsChange)
      )
      .subscribe(
        res => {
          if (res.ok) {
            this.onCancel();
            this.infoMessageShow = true;
          }
        },
        err => {
          console.log(
            DataConverter.credentialsChangeToJson(this.credentialsChange)
          );
          console.log('change credentials error ' + err.status);
          this.infoMessageShow = true;
          this.onCancel();
        }
      );
  }

  toggleForm(option: string) {
    this.formSetup(option);
    this.infoMessageShow = false;
    this.credentialsFormShow === false
      ? (this.credentialsFormShow = true)
      : (this.credentialsFormShow = false);

    this.animationTrigger === 'closed'
      ? (this.animationTrigger = 'open')
      : (this.animationTrigger = 'closed');
  }

  onCancel() {
    this.credentialsFormShow = false;
    this.animationTrigger = 'closed';
    this.username = false;
    this.newPassword = false;
    this.email = false;
    this.credentialsFrom.reset();
  }

  formSetup(option: string) {
    if (option === 'user') {
      this.username = true;
    } else if (option === 'pass') {
      this.newPassword = true;
    } else if (option === 'email') {
      this.email = true;
    }
  }
}
