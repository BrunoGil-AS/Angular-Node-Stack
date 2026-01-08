import { ProductService } from '../../services/product/product-service';
import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CartService } from '../../services/cart/cart-service';
import { ɵEmptyOutletComponent } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
})
export class ProductList {
  productService = inject(ProductService);
  cartService = inject(CartService);
}
