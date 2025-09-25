import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private base = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> { return this.http.get<User[]>(this.base); }
  getById(id: number): Observable<User> { return this.http.get<User>(`${this.base}/${id}`); }
  create(user: User): Observable<User> { return this.http.post<User>(this.base, user); }
  update(user: User): Observable<User> { return this.http.put<User>(`${this.base}/${user.id}`, user); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/${id}`); }
}
