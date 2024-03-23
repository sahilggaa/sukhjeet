import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  private apiUrl1 = 'http://localhost:3000/api/new-user';
  private apiUrl2 = 'http://localhost:3000/api/authenticate-otp';

  userData: any;

  createUser(name: any, contactNumber: any, imageFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('name', name);
    formData.append('contactNumber', contactNumber);
    formData.append('imageFile', imageFile, imageFile.name);

    return this.http.post(this.apiUrl1, formData);
  }

  private storeUserData(response: any): void {
    this.userData = response;
  }

  authenticateUser(contactNumber: string, signUpOtp: string): Observable<any> {
    return this.http.post<any>(this.apiUrl2, { contactNumber, signUpOtp }).pipe(
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.storeUserData(response); // Store response in service variable
        }
      })
    );
  }

  getUserData(): any {
    return this.userData;
  }

  logout() {
    localStorage.removeItem('token');
    console.log(localStorage.getItem('token'));
  }
}
