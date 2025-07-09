import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  initializeAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.initializeAuth),
      mergeMap(() =>
        this.authService.getProfile().pipe(
          map((user) => AuthActions.loadProfileSuccess({ user })),
          catchError((error) => {
            // If token is invalid, clear it and redirect to login
            this.authService.removeToken();
            this.router.navigate(['/login']);
            return of(AuthActions.logout());
          })
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map((response) => {
            this.authService.setToken(response.access_token);
            return AuthActions.loginSuccess({ response });
          }),
          catchError((error) =>
            of(
              AuthActions.loginFailure({
                error: error.error?.message || 'Login failed',
              })
            )
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          this.router.navigate(['/dashboard']);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.removeToken();
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadProfile),
      mergeMap(() =>
        this.authService.getProfile().pipe(
          map((user) => AuthActions.loadProfileSuccess({ user })),
          catchError((error) =>
            of(
              AuthActions.loadProfileFailure({
                error: error.error?.message || 'Failed to load profile',
              })
            )
          )
        )
      )
    )
  );

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUsers),
      mergeMap(() =>
        this.authService.getUsers().pipe(
          map((users) => AuthActions.loadUsersSuccess({ users })),
          catchError((error) =>
            of(
              AuthActions.loadUsersFailure({
                error: error.error?.message || 'Failed to load users',
              })
            )
          )
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.createUser),
      mergeMap(({ userData }) =>
        this.authService.createUser(userData).pipe(
          map((user) => AuthActions.createUserSuccess({ user })),
          catchError((error) =>
            of(
              AuthActions.createUserFailure({
                error: error.error?.message || 'Failed to create user',
              })
            )
          )
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateUser),
      mergeMap(({ id, userData }) =>
        this.authService.updateUser(id, userData).pipe(
          map((user) => AuthActions.updateUserSuccess({ user })),
          catchError((error) =>
            of(
              AuthActions.updateUserFailure({
                error: error.error?.message || 'Failed to update user',
              })
            )
          )
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.deleteUser),
      mergeMap(({ id }) =>
        this.authService.deleteUser(id).pipe(
          map(() => AuthActions.deleteUserSuccess({ id })),
          catchError((error) =>
            of(
              AuthActions.deleteUserFailure({
                error: error.error?.message || 'Failed to delete user',
              })
            )
          )
        )
      )
    )
  );
}
