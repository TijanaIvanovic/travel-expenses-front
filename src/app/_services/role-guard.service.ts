import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionToken } from '../_config/session.config';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = sessionStorage.getItem('userSession');
    const tokenData: SessionToken = JSON.parse(token);
    if (this.auth.isAuthenticated() && tokenData.role !== 1) {
      this.router.navigate(['adminnote']);
      return false;
    } else {
      return true;
    }
  }
}
