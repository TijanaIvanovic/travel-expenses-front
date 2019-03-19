import { SessionToken } from './../_config/session.config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('userSession');
    const tokenData: SessionToken = JSON.parse(token);
    // Check whether the token is expired and return
    // true or false
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
