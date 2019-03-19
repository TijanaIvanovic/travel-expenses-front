
import { HttpService } from './http.service';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { SessionToken } from '../_config/session.config';
import { User } from '../_models/user.model';
import { RegisterUserData } from '../_models/register-data.model';
import { UserSetupData } from '../_config/user-setup.config';
import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';
import { endPoint } from '../_config/end-points.config';
import { DataConverter } from '../_converters/data.converter';
import { Data } from '../_tests/data.provider';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  transferSetupData: Subject<any> = new Subject();
  session: SessionToken;
  userCredentials: User = new User();
  registerUserData: RegisterUserData;
  userSetupData: UserSetupData;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  // basic user setup : admin menu, username display, session, navigate to user url
  setUpUser() {
    // later compare employee.username with userCreditentials.username
    if (this.employeeService.employee.username !== undefined) {
      this.session = {
        uid: this.employeeService.employee.ide,
        username: this.userCredentials.username,
        role: this.employeeService.employee.role,
        start: new Date().toLocaleString()
      };
      this.userSetupData = new UserSetupData(
        'userSession',
        true,
        this.employeeService.employee.role === 1 ? true : false,
        this.userCredentials.username
      );
      // setup new session

      console.log(this.userCredentials);
      // send userSetupData to subscribing components
      this.transferSetupData.next(this.userSetupData);
      // store session in sessionStorage
      sessionStorage.setItem('userSession', JSON.stringify(this.session));
      // navigate user to his configured url
      this.router.navigateByUrl('/user/' + this.employeeService.employee.ide);
    }
  }

  loginOnReload() {
  // const token = sessionStorage.getItem('userSession');
  // const tokenData: SessionToken = JSON.parse(token);
  // // login in case of reload
  // if(this.employeeService.employee.id === undefined && token) {
  //   this.http
  //   .loginByID(
  //     endPoint.baseUrl + endPoint.login + tokenData.uid
  //   )
  //   .subscribe(
  //     res => {
  //       this.employeeService.employee = DataConverter.jsonToEmployee(res);
  //     },
  //     err => {
  //       console.log('http error on login by id ' + err.status);
  //       this.employeeService.employee = DataConverter.jsonToEmployee(
  //         Data.employee
  //       );
  //       console.log(this.employeeService.employee);
  //     }
  //   );
  // }
  }

  // get session data
  sessionData() {
    return JSON.parse(sessionStorage.getItem('userSession'));
  }
}
