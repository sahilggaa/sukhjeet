import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  private apiUrl1 = 'http://localhost:3000/api/new-user';
  private apiUrl2 = 'http://localhost:3000/api/authenticate-otp';

  isAuthenticated = false;

  createUser(name: any, contactNumber: any, imageFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('name', name);
    formData.append('contactNumber', contactNumber);
    formData.append('imageFile', imageFile, imageFile.name);

    return this.http.post(this.apiUrl1, formData);
  }

  authenticateUser(contactNumber: string, signUpOtp: string): Observable<any> {
    return this.http.post<any>(this.apiUrl2, { contactNumber, signUpOtp }).pipe(
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }
}
