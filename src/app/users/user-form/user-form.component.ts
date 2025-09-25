import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as UsersActions from '../../store/users/users.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
  form!: FormGroup;
  editing = false;
  id?: number;
  roles = ['tech', 'id', 'gd', 'qa'];

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      'job-role': ['tech', Validators.required]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editing = true;
      this.id = Number(idParam);
      this.userService.getById(this.id).subscribe(user => {
        this.form.patchValue(user);
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    const payload: User = { ...this.form.value };
    if (this.editing && this.id) {
      payload.id = this.id;
      this.store.dispatch(UsersActions.updateUser({ user: payload }));
    } else {
      this.store.dispatch(UsersActions.addUser({ user: payload }));
    }
    this.router.navigate(['/dashboard']);
  }
}
