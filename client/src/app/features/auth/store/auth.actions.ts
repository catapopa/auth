import {
  CreateUserDto,
  LoginDto,
  LoginResponse,
  UpdateUserDto,
  User,
} from '@auth/shared';
import { createAction, props } from '@ngrx/store';

// Auth Actions
export const initializeAuth = createAction(
  '[Auth] Initialize',
  props<{ token: string }>()
);

export const login = createAction(
  '[Auth] Login',
  props<{ credentials: LoginDto }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ response: LoginResponse }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const loadProfile = createAction('[Auth] Load Profile');

export const loadProfileSuccess = createAction(
  '[Auth] Load Profile Success',
  props<{ user: User }>()
);

export const loadProfileFailure = createAction(
  '[Auth] Load Profile Failure',
  props<{ error: string }>()
);

// User Management Actions
export const loadUsers = createAction('[Users] Load Users');

export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: string }>()
);

export const createUser = createAction(
  '[Users] Create User',
  props<{ userData: CreateUserDto }>()
);

export const createUserSuccess = createAction(
  '[Users] Create User Success',
  props<{ user: User }>()
);

export const createUserFailure = createAction(
  '[Users] Create User Failure',
  props<{ error: string }>()
);

export const updateUser = createAction(
  '[Users] Update User',
  props<{ id: number; userData: UpdateUserDto }>()
);

export const updateUserSuccess = createAction(
  '[Users] Update User Success',
  props<{ user: User }>()
);

export const updateUserFailure = createAction(
  '[Users] Update User Failure',
  props<{ error: string }>()
);

export const deleteUser = createAction(
  '[Users] Delete User',
  props<{ id: number }>()
);

export const deleteUserSuccess = createAction(
  '[Users] Delete User Success',
  props<{ id: number }>()
);

export const deleteUserFailure = createAction(
  '[Users] Delete User Failure',
  props<{ error: string }>()
);
