import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const loadUsers = createAction('[Users] Load Users');
export const loadUsersSuccess = createAction('[Users] Load Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[Users] Load Failure', props<{ error: any }>());

export const addUser = createAction('[Users] Add User', props<{ user: User }>());
export const addUserSuccess = createAction('[Users] Add Success', props<{ user: User }>());
export const addUserFailure = createAction('[Users] Add Failure', props<{ error: any }>());

export const updateUser = createAction('[Users] Update User', props<{ user: User }>());
export const updateUserSuccess = createAction('[Users] Update Success', props<{ user: User }>());
export const updateUserFailure = createAction('[Users] Update Failure', props<{ error: any }>());

export const deleteUser = createAction('[Users] Delete User', props<{ id: number }>());
export const deleteUserSuccess = createAction('[Users] Delete Success', props<{ id: number }>());
export const deleteUserFailure = createAction('[Users] Delete Failure', props<{ error: any }>());
