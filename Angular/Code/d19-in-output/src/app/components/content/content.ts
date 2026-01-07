import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../interfaces/product';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CurrencyPipe, ProductCardComponent],
  templateUrl: './content.html',
  styleUrls: ['./content.css'],
})
export class Content {
  protected readonly products: Product[] = [
    { name: 'Laptop', description: 'A powerful laptop', price: 999.99 },
    { name: 'Smartphone', description: 'A smart smartphone', price: 699.99 },
    { name: 'Desk Chair', description: 'A comfy chair', price: 89.99 },
    { name: 'Coffee Maker', description: 'A great coffee maker', price: 49.99 },
    { name: 'Book: Angular Basics', description: 'A book about Angular', price: 29.99 },
  ];

  cartTotal = 0;

  onAddToCart(): void {
    this.cartTotal++;
  }
}
