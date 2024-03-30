// socket.service.ts
import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;

  constructor() {
    this.socket = io('http://localhost:3000'); // Replace 'http://your-server-url' with your Socket.IO server URL
  }

  joinRoom(contactNumber: string) {
    this.socket.emit('joinRoom', contactNumber);
  }

  sendMessage(contactNumber: string, message: string) {
    this.socket.emit('sendMessage', contactNumber, message);
  }

  receiveMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('receiveMessage', (data: any) => {
        observer.next(data);
      });
    });
  }
}
