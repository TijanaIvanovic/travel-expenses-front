import { UserService } from 'src/app/_services/user.service';
import { RolePipe } from './../../_converters/role.pipe';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpService } from 'src/app/_services/http.service';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/_services/employee.service';
import { SessionToken } from 'src/app/_config/session.config';
import { endPoint } from 'src/app/_config/end-points.config';
import { DataConverter } from 'src/app/_converters/data.converter';
import { Data } from 'src/app/_tests/data.provider';
import {
  employeeAnimation,
  businessTripAnimation,
  newBusinessTripAnimation
} from 'src/app/_animations/business-trip.animation';
import { Employee } from 'src/app/_models/employee.model';
import { EmployeeDTO } from 'src/app/_dto/employee.dto';
import { Status } from 'src/app/_models/status.model';
import { StatusDTO } from 'src/app/_dto/status.dto';
import { RoleDTO } from 'src/app/_dto/role.dto.';
import { Role } from 'src/app/_models/role.model.';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.scss'],
  animations: [
    employeeAnimation,
    businessTripAnimation,
    newBusinessTripAnimation
  ]
})
export class AllEmployeesComponent implements OnInit {

  newEmployeeForm: FormGroup;
  animationTrigger = 'closed';
  allEmployees: Employee[] = [];
  roles: Role[] = [];

  constructor(private employeeService: EmployeeService, private http: HttpService, private userService:UserService) { }

  ngOnInit() {
    this.newEmployeeForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      role: new FormControl()
    });
    
    const token = sessionStorage.getItem('userSession');
    const tokenData: SessionToken = JSON.parse(token);
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
    // login in case of reload
    // if(this.employeeService.employee.ide === undefined && token) {
    //   console.log('ok')
    //   this.http
    //   .loginByID(
    //     endPoint.baseUrl + endPoint.login + tokenData.uid
    //   )
    //   .subscribe(
    //     res => {
    //       this.employeeService.employee = DataConverter.jsonToEmployee(res);
    //       // this.userService.userCredentials.username = tokenData.username;
    //       // console.log(this.employeeService.employee);
    //     },
    //     err => {
    //       console.log('http error on login by id ' + err.status);
    //       this.employeeService.employee = DataConverter.jsonToEmployee(
    //         Data.employee
    //       );
    //       this.userService.userCredentials.username = tokenData.username;
    //       console.log(this.employeeService.employee);
    //     }
    //   );
    // } 

    this.http.getEmployees(endPoint.baseUrl + endPoint.employees).subscribe(
     ( res: EmployeeDTO[]) => {
        this.allEmployees = DataConverter.jsonToTripEmployees(res);
        console.log(res);
      },
      err => {
        console.log('http error on login by id ' + err.status);
        this.allEmployees = DataConverter.jsonToTripEmployees(Data.employeesOnTrip);
        console.log(this.allEmployees[0].role);
      }
    );
  }

x(){
  console.log(parseInt(this.newEmployeeForm.get('role').value ) + 1);
}
  save(){
    const employee = new Employee(
      null,
      this.newEmployeeForm.get('firstName').value,
      this.newEmployeeForm.get('lastName').value,
      this.newEmployeeForm.get('email').value,
      null,
      null,
      null
    );

    this.http.saveEmployee(endPoint.baseUrl + endPoint.employee, DataConverter.employeeToJson(employee)).subscribe(
      res => {
        if(res.ok){
          console.log('save employee succesfull');
        }
      },
      err => {
        console.log('http error on login by id ' + err.status);
        this.allEmployees.push(employee);
      }
    )
    this.animationTrigger = 'closed';
    this.newEmployeeForm.reset();
  }

  onAddEmployee() {
    //this.businesTrip = this.employee.businessTrips[ind - 1];
    //console.log(this.businesTrip);
    this.animationTrigger = 'open';
  }
  onCloseAddEmployee() {
    this.animationTrigger = 'closed';
    this.newEmployeeForm.reset();
  }

  setRoleString(id: number): string{
    console.log(this.roles[id].name)
    return this.roles[id].name;
  }
}
