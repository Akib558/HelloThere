import { Routes } from '@angular/router';
import { JointRoomComponent } from './joint-room/joint-room.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
  { path: '', redirectTo: 'join-room', pathMatch: 'full' },
  { path: 'join-room', component: JointRoomComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'chat', component: ChatComponent },
];
