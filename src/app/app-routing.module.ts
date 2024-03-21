import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatBotComponent } from './chat-bot/chat-bot.component';

const routes: Routes = [
  { path: '', component: ChatBotComponent },
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatBotComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
