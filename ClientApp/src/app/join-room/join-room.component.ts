import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from '../chat.service';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { log } from 'console';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class JoinRoomComponent implements OnInit {
  joinRoomForm!: FormGroup;
  fb = inject(FormBuilder);
  router = inject(Router);
  chatService = inject(ChatService);

  ngOnInit(): void {
    this.joinRoomForm = this.fb.group({
      user: ['', Validators.required],
      room: ['', Validators.required],
    });
  }

  joinRoom() {
    console.log(this.joinRoomForm.value);

    const { user, room } = this.joinRoomForm.value;
    sessionStorage.setItem('user', user);
    sessionStorage.setItem('room', room);
    this.chatService
      .joinRoom(user, room)
      .then(() => {
        console.log('Joined Room');

        this.router.navigate(['chat']);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
