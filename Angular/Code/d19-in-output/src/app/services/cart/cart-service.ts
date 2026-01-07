import { ProductService } from './../product/product-service';
import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../../interfaces/product';
import { Item } from '../../interfaces/item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = signal<Item[]>([]);
  ProductService = inject(ProductService);

  getCartItems(): Item[] {
    return this.cartItems();
  }

  addToCart(product: Product): void {
    console.log('Adding to cart', this.cartItems(), 'this product', product);
    this.cartItems.update((currentItems) => {
      const existingItem = currentItems.find((item) => item.product.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...currentItems, { product, quantity: 1 }];
      }
    });
  }
  getNumbersOfItemsInCart(): number {
    //counts all the quantities for each item in the cart
    const total = this.cartItems().reduce((total, item) => total + item.quantity, 0);
    console.log('total', total);
    return total;
  }
}
