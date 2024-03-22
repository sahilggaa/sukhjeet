import { Component } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  constructor(
    private loginService: LoginService,
    private _snackbar: MatSnackBar,
    private router: Router
  ) {}

  contactNumber: string = '';
  signUpOtp: string = '';

  onSubmit() {
    this.loginService
      .authenticateUser(this.contactNumber, this.signUpOtp)
      .subscribe(
        (response) => {
          console.log('User Authenticated Successfully');
          this._snackbar.open('User Authenticated Successfully', 'OK');
          // Redirect to another page upon successful authentication
          this.router.navigateByUrl('/chat');
        },
        (error) => {
          console.error('Error Authenticating User:', error);
          this._snackbar.open('Error Authenticating User', 'Close', {
            duration: 3000,
          });
        }
      );
  }
}
