import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  readonly features = [
    { icon: '🛍️', title: 'Catálogo Completo' },
    { icon: '⚡', title: 'Rápido y Seguro' },
    { icon: '📦', title: 'Envío Confiable' }
  ];
}
