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
    private socketService:SocketService
  ) {}

  userData: any;
  name: String = '';
  contactNumber: String = '';
  userImage: String = '';
  messages:any[]=[];

  ngOnInit(): void {
    this.userData = this.loginService.getUserData();
    this.name = this.userData.user.name;
    this.userImage = this.userData.user.userImage;
    this.contactNumber = this.userData.user.contactNumber;
    this.socketService.receiveMessage().subscribe((data: any) => {
      this.messages.push(data);
    });
    console.log('User Data:', this.userData, this);
    console.log(this.name);
  }

  joinRoom(contactNumber: string) {
    this.socketService.joinRoom(contactNumber);
  }

  sendMessage(contactNumber: string, message: string) {
    this.socketService.sendMessage(contactNumber, message);
  }



  onLogout() {
    this.loginService.logout();
    this._snackBar.open('User Logged Out', 'OK');
    this.router.navigateByUrl('/sign-in');
  }
}
