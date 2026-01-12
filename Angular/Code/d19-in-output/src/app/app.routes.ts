import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { ProductList } from './components/product-list/product-list';
import { User } from './components/user/user';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'products', component: ProductList },
  { path: `users`, component: User },
  { path: '**', redirectTo: '' },
];
