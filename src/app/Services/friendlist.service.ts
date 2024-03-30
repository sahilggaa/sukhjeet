import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) { }

  getChatData(): Observable<any[]> {
    return this.http.get<any[]>('api/chat-data'); // Replace 'api/chat-data' with your API endpoint
  }
}
