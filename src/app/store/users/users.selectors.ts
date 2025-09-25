import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState, adapter } from './users.reducer.ts';

export const selectUsersState = createFeatureSelector<UsersState>('users');

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectAllUsers = createSelector(selectUsersState, selectAll);
export const selectUserEntities = createSelector(selectUsersState, selectEntities);
export const selectUsersLoading = createSelector(selectUsersState, s => s.loading);
