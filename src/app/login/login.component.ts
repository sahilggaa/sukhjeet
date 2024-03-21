import { Component } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { MaterialModule } from '../Material/material/material.module'; // Import MaterialModule if needed

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  name: string = '';
  contactNumber: string = '';
  imageFile: File | null = null;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private _snackBar: MatSnackBar // Inject MatSnackBar instead of MatSnackBarModule
  ) {}

  onFileSelected(event: any): void {
    this.imageFile = event.target.files[0];
  }

  onSubmit(): void {
    if (!this.imageFile) {
      console.error('No image selected');
      return;
    }

    this.loginService
      .createUser(this.name, this.contactNumber, this.imageFile)
      .subscribe(
        (response) => {
          console.log('User created successfully:', response);
          // Clear form fields after successful creation
          this.name = '';
          this.contactNumber = '';
          this.imageFile = null;
          this._snackBar.open('Logged In successfully.', 'Ok');
          this.router.navigateByUrl('/chat');
        },
        (error) => {
          console.error('Error creating user:', error);
          // Display error message using MatSnackBar
          this._snackBar.open('Error creating user', 'Close', {
            duration: 3000, // Snackbar will close automatically after 3 seconds
          });
        }
      );
  }
}
