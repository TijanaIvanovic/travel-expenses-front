import { SessionToken } from '../_config/session.config';
import { Employee } from '../_models/employee.model';
import { DataConverter } from '../_converters/data.converter';
import { Injectable } from '@angular/core';
import { User } from '../_models/user.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserSetupData } from '../_config/user-setup.config';
import { RegisterUserData } from '../_models/register-data.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // setter and getter for employee
  employee: Employee = new Employee();

  constructor(private router: Router) {}
}
