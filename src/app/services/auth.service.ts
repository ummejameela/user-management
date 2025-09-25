import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isLogged$ = new BehaviorSubject<boolean>(!!localStorage.getItem('mock_user'));
  isLogged$ = this._isLogged$.asObservable();

  login(username: string, password: string): boolean {
    // Mock accept any username/password
    const token = btoa(JSON.stringify({ username }));
    localStorage.setItem('mock_user', token);
    this._isLogged$.next(true);
    return true;
  }

  logout() {
    localStorage.removeItem('mock_user');
    this._isLogged$.next(false);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('mock_user');
  }
}
