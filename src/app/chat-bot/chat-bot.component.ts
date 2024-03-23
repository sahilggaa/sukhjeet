import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css'],
})
export class ChatBotComponent implements OnInit {
  constructor(private loginService: LoginService) {}

  userData: any;
  name: String = '';
  contactNumber: String = '';
  userImage: String = '';
  ngOnInit(): void {
    this.userData = this.loginService.getUserData();
    this.name = this.userData.user.name;
    this.userImage = this.userData.user.userImage;
    this.contactNumber = this.userData.user.contactNumber;
    console.log('User Data:', this.userData, this);
    console.log(this.name);
  }
}
