import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  inputMessage = '';
  messages: any[] = [];
  loggedInUserName = sessionStorage.getItem('user');
  roomName = sessionStorage.getItem('room');

  @ViewChild('scrollMe') private scrollContainer!: ElementRef;

  constructor(public chatService: ChatService, private router: Router) {}

  ngOnInit(): void {
    this.chatService.messages$.subscribe((res) => {
      this.messages = res;
    });

    this.chatService.connectedUsers$.subscribe((res) => {
      console.log(res);
    });
  }

  ngAfterViewChecked(): void {
    this.scrollContainer.nativeElement.scrollTop =
      this.scrollContainer.nativeElement.scrollHeight;
  }

  sendMessage() {
    this.chatService
      .sendMessage(this.inputMessage)
      .then(() => {
        this.inputMessage = '';
      })
      .catch((err) => {
        console.log(err);
      });
  }

  leaveChat() {
    this.chatService
      .leaveChat()
      .then(() => {
        this.router.navigate(['welcome']);
        setTimeout(() => {
          location.reload();
        }, 0);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
