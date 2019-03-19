import { DestinationsDTO } from './_dto/destinations.dto';
import { Data } from './_tests/data.provider';
import { DataConverter } from 'src/app/_converters/data.converter';
import { endPoint } from './_config/end-points.config';
import { DestinationsService } from './_services/destinations.service';
import { EmployeeService } from './_services/employee.service';
import { Employee } from './_models/employee.model';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { routingAnimation } from './_animations/routing.animation';
import { HttpService } from './_services/http.service';
import { DestinationDTO } from './_dto/destination.dto';
import { dropdownAnimation } from './_animations/dropdown.animation';
import { UserService } from './_services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routingAnimation, dropdownAnimation]
})
export class AppComponent implements OnInit {
  title = 'Business trips';
  activeLink = 'false';
  animationTrigger = 'closed';
  dropdownMenu = false;

  username = 'this.userService.userSetupData.username';
  userMenu = false;
  adminMenu = false;

  constructor(
    private destinationService: DestinationsService,
    private http: HttpService,
    private userService: UserService,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    // get basic setup data for curent user from userservice via Subject
    this.userService.transferSetupData.subscribe(data => {
      this.adminMenu = data.adminMenu;
      this.userMenu = data.userMenu;
      this.username = data.username;
    });
  }

  onEmployees() {
    this.router.navigateByUrl('/allemployees');
    this.activeLink = '/allemployees';
  }
  
  onUserInfo() {
    this.router.navigateByUrl('/user/' + this.employeeService.employee.ide);
    this.closeDropdownMenu();
  }
  onCredentials() {
    this.router.navigateByUrl(
      '/user/' + this.employeeService.employee.ide + '/credentials'
    );
    this.closeDropdownMenu();
  }
  onLogout() {
    sessionStorage.removeItem(this.userService.userSetupData.sessionName);
    this.employeeService.employee = undefined;
    this.userService.userCredentials.username = null;
    this.userService.userCredentials.password = null;

    this.adminMenu = false;
    this.userMenu = false;
    this.router.navigateByUrl('/login');
    this.closeDropdownMenu();
  }

  onDropdownMenu() {
    this.animationTrigger === 'closed'
      ? (this.animationTrigger = 'open')
      : (this.animationTrigger = 'closed');
  }

  closeDropdownMenu() {
    this.animationTrigger = 'closed';
  }
}
