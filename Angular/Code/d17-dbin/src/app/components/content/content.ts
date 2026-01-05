import type { Product } from './../../../../../../../ts/code/d5-end/src/Product';
import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

// add a extra field into the Product interface: Available (boolean)

interface ProductWithAvailability extends Product {
  available: boolean;
}

@Component({
  selector: 'app-content',
  imports: [CurrencyPipe],
  templateUrl: './content.html',
  styleUrl: './content.css',
})
export class Content {
  protected readonly products: ProductWithAvailability[] = [
    { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics', available: true },
    { id: 2, name: 'Smartphone', price: 699.99, category: 'Electronics', available: true },
    { id: 3, name: 'Desk Chair', price: 89.99, category: 'Furniture', available: false },
    { id: 4, name: 'Coffee Maker', price: 49.99, category: 'Appliances', available: true },
    { id: 5, name: 'Book: Angular Basics', price: 29.99, category: 'Books', available: true },
  ];
}
