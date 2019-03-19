import { Data } from './../../_tests/data.provider';
import { EmployeeService } from '../../_services/employee.service';
import { HttpService } from 'src/app/_services/http.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataConverter } from 'src/app/_converters/data.converter';
import { RegisterUserData } from 'src/app/_models/register-data.model';
import { endPoint } from 'src/app/_config/end-points.config';
import { UserService } from 'src/app/_services/user.service';
import { Role } from 'src/app/_models/role.model.';
import { RoleDTO } from 'src/app/_dto/role.dto.';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  roles: Role[] = [];
  constructor(
    private http: HttpService,
    private employeeService: EmployeeService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl(null, [
        // Validators.required
        // Validators.pattern('^[A-Z][a-z][0-9]{2,30}$')
      ]),
      password: new FormControl(null, [
        // Validators.required
        // Validators.pattern('^[A-Z][0-9]{6, 20}$')
      ]),
      firstName: new FormControl(null, [
        // Validators.required
        // Validators.pattern('^[A-Z][0-9]{6, 20}$')
      ]),
      lastName: new FormControl(null, [
        // Validators.required
        // Validators.pattern('^[A-Z][0-9]{6, 20}$')
      ]),
      role: new FormControl()
    });
     // get roles
     this.http
     .getRoles(endPoint.baseUrl + endPoint.roles)
     .subscribe(
       (res: RoleDTO[]) => {
         this.roles = DataConverter.jsonToRoles(res);
       },
       err => {
         console.log('error on destination get ' + err.status);
         this.roles = DataConverter.jsonToRoles(Data.roles);
         console.log(this.roles);
       }
     );
  }

  register() {
    // data to be sent for registration
    this.userService.registerUserData = new RegisterUserData(
      this.registerForm.get('username').value,
      this.registerForm.get('password').value,
      this.registerForm.get('firstName').value,
      this.registerForm.get('lastName').value,
      (parseInt(this.registerForm.get('role').value) + 1)
    );
    console.log(this.userService.registerUserData);

    // setting up user login data
    this.userService.userCredentials.username = this.registerForm.get(
      'username'
    ).value;
    this.userService.userCredentials.password = this.registerForm.get(
      'password'
    ).value;
    console.log(this.userService.registerUserData);
    // send request
    this.http
      .register(
        endPoint.baseUrl + endPoint.register,
        DataConverter.registerUserDataToJson(this.userService.registerUserData)
      )
      .subscribe(
        res => {
          this.employeeService.employee = DataConverter.jsonToEmployee(res);
        },
        err => {
          console.log('http error on register ' + err.status);
          this.employeeService.employee = DataConverter.jsonToEmployee(
            Data.employee
          );
        }
      );
  }
}
