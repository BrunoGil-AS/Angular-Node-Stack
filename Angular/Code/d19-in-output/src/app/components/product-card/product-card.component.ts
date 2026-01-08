import { Component, EventEmitter, inject, input, Input, Output } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart/cart-service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  standalone: true,
  imports: [CurrencyPipe],
})
export class ProductCardComponent {
  //@Input({ required: true }) product!: Product;
  product = input.required<Product>();
  cartService = inject(CartService);
}
