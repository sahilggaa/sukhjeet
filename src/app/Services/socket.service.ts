// socket.service.ts
import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: any;

  constructor() {
    this.socket = io('http://localhost:3000'); // Replace 'http://your-server-url' with your Socket.IO server URL
  }

  public joinRoom(contactNumber: any): void {
    this.socket.emit('joinRoom', contactNumber);
  }

  public sendMessage(contactNumber: any, message: any): void {
    this.socket.emit('sendMessage', contactNumber, message);
  }

  public receiveMessage(callback: (data: any) => void): void {
    this.socket.on('receiveMessage', callback);
  }
}
