import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../Services/login.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      // Token exists, so the user is authenticated
      console.log(token);
      return true;
    } else {
      // Token doesn't exist, redirect to login page
      this.router.navigateByUrl('sign-in');
      return false;
    }
  }
}
