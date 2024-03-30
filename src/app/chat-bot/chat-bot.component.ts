import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SocketService } from '../Services/socket.service';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css'],
})
export class ChatBotComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private socketService: SocketService
  ) {}

  userData: any;
  name: string = '';
  contactNumber: string = '';
  userImage: string = '';
  messages: string = '';
  receivedMessages: any[] = []; // Array to store received messages

  ngOnInit(): void {
    this.userData = this.loginService.getUserData();
    this.name = this.userData.user.name;
    this.userImage = this.userData.user.userImage;
    this.contactNumber = this.userData.user.contactNumber;

    // Example: Joining a room
    this.socketService.joinRoom(this.contactNumber);

    // Example: Receiving messages
    this.socketService.receiveMessage((data: any) => {
      console.log('Received message:', data);
      this.receivedMessages.push(data); // Push received message to array
    });

    console.log('User Data:', this.userData, this);
    console.log(this.name);
  }

  sendMessage(): void {
    // Example: Sending a message
    this.socketService.sendMessage(this.contactNumber, this.messages);
    this.messages = '';
  }

  onLogout() {
    this.loginService.logout();
    this._snackBar.open('User Logged Out', 'OK');
    this.router.navigateByUrl('sign-in');
  }
}
