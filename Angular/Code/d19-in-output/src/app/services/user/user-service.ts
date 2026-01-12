import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import User from '../../interfaces/user';
import { Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { apiRoutes } from '../../enviroment/api-routes';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  private users$ = this.getUsers();

  users = toSignal(this.users$, { initialValue: [] });

  private getUsers(): Observable<User[]> {
    return this.http.get<User[]>(apiRoutes.usersPlaceholder + '/users');
  }
}
