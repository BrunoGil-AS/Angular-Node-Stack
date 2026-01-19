import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  isOpen = signal(false);

  toggleSidebar() {
    this.isOpen.update((value) => !value);
  }

  closeSidebar() {
    this.isOpen.set(false);
  }
}
