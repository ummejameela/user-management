import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as UsersActions from './users.actions';
import { User } from '../../models/user.model';

export interface UsersState extends EntityState<User> {
  loading: boolean;
  error: any | null;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UsersState = adapter.getInitialState({
  loading: false,
  error: null
});

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, state => ({ ...state, loading: true })),
  on(UsersActions.loadUsersSuccess, (state, { users }) => adapter.setAll(users, { ...state, loading: false })),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(UsersActions.addUserSuccess, (state, { user }) => adapter.addOne(user, state)),
  on(UsersActions.updateUserSuccess, (state, { user }) => adapter.upsertOne(user, state)),
  on(UsersActions.deleteUserSuccess, (state, { id }) => adapter.removeOne(id.toString ? id : id, state))
);
