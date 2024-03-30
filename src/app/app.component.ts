// app.component.ts

import { Component } from '@angular/core';
import { SocketService } from './Services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  message: string = '';
  receivedMessage: string = '';

  constructor(private socketService: SocketService) { }


}
