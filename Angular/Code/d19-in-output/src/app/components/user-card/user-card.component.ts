import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import User from '../../interfaces/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class UserCardComponent {
  user = input.required<User>();
}
