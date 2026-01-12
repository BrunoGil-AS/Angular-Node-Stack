import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user/user-service';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-user',
  imports: [CommonModule, UserCardComponent],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  userService = inject(UserService);

  users = this.userService.users;
}
