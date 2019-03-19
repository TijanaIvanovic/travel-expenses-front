import { RolePipe } from './_converters/role.pipe';
import { EmployeeService } from './_services/employee.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';
import { EmployeeComponent } from './_components/employee/employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllEmployeesComponent } from './_components/all-employees/all-employees.component';
import { DestinationsComponent } from './_components/destinations/destinations.component';
import { PageNotFoundComponent } from './_components/page-not-found/page-not-found.component';
import { Employee } from './_models/employee.model';
import { BusinessTripsComponent } from './_components/business-trips/business-trips.component';
import { CredentialsComponent } from './_components/credentials/credentials.component';
import { AdminNoteComponent } from './_components/admin-note/admin-note.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EmployeeComponent,
    AllEmployeesComponent,
    DestinationsComponent,
    PageNotFoundComponent,
    BusinessTripsComponent,
    CredentialsComponent,
    AdminNoteComponent, RolePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
