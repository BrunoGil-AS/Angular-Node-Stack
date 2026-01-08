import { Injectable, signal } from '@angular/core';
import { Product } from '../../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products = signal<Product[]>([
    { id: 1, name: 'Laptop', description: 'A powerful laptop', price: 999.99 },
    { id: 2, name: 'Smartphone', description: 'A smart smartphone', price: 699.99 },
    { id: 3, name: 'Desk Chair', description: 'A comfy chair', price: 89.99 },
    { id: 4, name: 'Coffee Maker', description: 'A great coffee maker', price: 49.99 },
    { id: 5, name: 'Book: Angular Basics', description: 'A book about Angular', price: 29.99 },
  ]);

  getProducts(): Product[] {
    return this.products();
  }

  getProduct(id: number): Product | undefined {
    return this.products().find((product) => product.id === id);
  }

  add(product: Product): void {
    this.products.update((prevProducts) => [...prevProducts, product]);
  }
  remove(product: Product): void {
    this.products.update((prevProducts) => prevProducts.filter((p) => p !== product));
  }
}
