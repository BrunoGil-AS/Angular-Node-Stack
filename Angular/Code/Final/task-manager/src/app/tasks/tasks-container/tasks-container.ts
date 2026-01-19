import { Component } from '@angular/core';
import { Sidebar } from '../../UI/sidebar/sidebar';

@Component({
  selector: 'app-tasks-container',
  imports: [Sidebar],
  templateUrl: './tasks-container.html',
  styleUrl: './tasks-container.css',
})
export class TasksContainer {}
