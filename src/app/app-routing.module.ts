import { AdminNoteComponent } from './_components/admin-note/admin-note.component';
import { CredentialsComponent } from './_components/credentials/credentials.component';
import { EmployeeComponent } from './_components/employee/employee.component';
import { LoginComponent } from './_components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './_components/register/register.component';
import { AllEmployeesComponent } from './_components/all-employees/all-employees.component';
import { DestinationsComponent } from './_components/destinations/destinations.component';
import { PageNotFoundComponent } from './_components/page-not-found/page-not-found.component';
import { BusinessTripsComponent } from './_components/business-trips/business-trips.component';
import { AuthGuardService as AuthGuard } from './_services/auth-guard.service';
import { RoleGuardService as RoleGuard } from './_services/role-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/:id', component: EmployeeComponent, canActivate: [AuthGuard] },
  {
    path: 'user/:id/credentials',
    component: CredentialsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'allemployees',
    component: AllEmployeesComponent,
    canActivate: [RoleGuard, AuthGuard]
  },
  {
    path: 'destinations',
    component: DestinationsComponent,
    canActivate: [RoleGuard, AuthGuard]
  },
  {
    path: 'businesstrips',
    component: BusinessTripsComponent,
    canActivate: [RoleGuard, AuthGuard]
  },
  {
    path: 'adminnote',
    component: AdminNoteComponent
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
