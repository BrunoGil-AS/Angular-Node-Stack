import { ProductService } from './../../services/product/product-service';
import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CartService } from '../../services/cart/cart-service';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './content.html',
  styleUrls: ['./content.css'],
})
export class Content {
  productService = inject(ProductService);
  cartService = inject(CartService);
}
