import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UsersActions from '../../store/users/users.actions';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { selectAllUsers, selectUsersLoading } from '../../store/users/users.selectors';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  users$!: Observable<User[]>;
  loading$!: Observable<boolean>;

  constructor(private store: Store, private router: Router, public auth: AuthService) {}

  ngOnInit() {
    this.store.dispatch(UsersActions.loadUsers());
    this.users$ = this.store.select(selectAllUsers);
    this.loading$ = this.store.select(selectUsersLoading);
  }

  add() { this.router.navigate(['/user/new']); }
  edit(user: User) { this.router.navigate(['/user', user.id, 'edit']); }
  delete(user: User) {
    if (confirm(`Delete ${user.username}?`)) {
      this.store.dispatch(UsersActions.deleteUser({ id: Number(user.id) }));
    }
  }

  logout() { this.auth.logout(); this.router.navigate(['/login']); }
}
