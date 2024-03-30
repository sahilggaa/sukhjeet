import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatBotComponent } from './chat-bot/chat-bot.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthGuard } from './Auth/auth.guard';

const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'sign-up', component: LoginComponent },
  { path: 'chat', component: ChatBotComponent, canActivate: [AuthGuard] },
  { path: 'sign-in', component: SignInComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
