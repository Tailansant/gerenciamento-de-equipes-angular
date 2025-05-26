TypeScript

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, zip } from 'rxjs';
import { catchError, map, switchMap, tap, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as AuthActions from '../actions/auth.actions';
import * as NotificationsActions from '../actions/notifications.actions';
import * as AuthSelectors from '../selectors/auth.selectors';

import { RestApiService } from 'src/app/core/services/rest-api.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

import { User } from 'src/app/core/models/user.model';
import {
  AUTH_STATE,
  SIGN_IN_SUCCESS_EN,
  SIGN_IN_SUCCESS_RU,
  SIGN_UP_SUCCESS_EN,
  SIGN_UP_SUCCESS_RU,
  USER_DELETED,
  USER_UPDATED,
} from 'src/app/core/constants/constants';
import { Languages } from 'src/app/core/constants/l10n-config';

@Injectable()
export class AuthEffects {
  updateAuthStateFromLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateAuthStateFromLocalStorage),
      switchMap(() => {
        const state = this.localStorageService.getItem(AUTH_STATE);
        if (state) {
          const parsedState = JSON.parse(state);
          return of(AuthActions.updateAuthStateFromLocalStorage({
            user: parsedState.user,
            token: parsedState.token,
            isAuthenticated: !!parsedState.token,
          }));
        }
        return of(AuthActions.updateAuthStateFromLocalStorage({
          user: null,
          token: null,
          isAuthenticated: false
        }));
      })
    )
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      tap(() => this.store.dispatch(NotificationsActions.startLoading())),
      switchMap(action =>
        this.restApiService.signIn(action.credentials).pipe(
          map(response => {
            const user: User = {
              id: response.id || response._id,
              name: response.name,
              login: response.login,
              role: response.role || 'user'
            };
            return AuthActions.signInSuccess({ user, token: response.token });
          }),
          catchError(error => {
            this.store.dispatch(NotificationsActions.stopLoading());
            return of(AuthActions.signInFailure({ error: error.message || 'Erro desconhecido ao fazer login' }));
          })
        )
      )
    )
  );

  signInSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signInSuccess),
      tap(action => {
        this.localStorageService.setItem(AUTH_STATE, JSON.stringify({
          isAuthenticated: true,
          user: action.user,
          token: action.token
        }));
        this.router.navigate(['/boards']);
        const msg = localStorage.getItem('lang') === Languages.english ? SIGN_IN_SUCCESS_EN : SIGN_IN_SUCCESS_RU;
        this.store.dispatch(NotificationsActions.setMessage({ msg }));
        this.store.dispatch(NotificationsActions.stopLoading());
      })
    ),
    { dispatch: false }
  );

  signInFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signInFailure),
      map(action => {
        this.store.dispatch(NotificationsActions.stopLoading());
        return NotificationsActions.setMessage({ msg: action.error });
      })
    )
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      tap(() => this.store.dispatch(NotificationsActions.startLoading())),
      switchMap(action =>
        this.restApiService.signUp(action.credentials).pipe(
          map(response => {
            const user: User = {
              id: response.id || response._id,
              name: response.name,
              login: response.login,
              role: 'user'
            };
            return AuthActions.signUpSuccess({ user });
          }),
          catchError(error => {
            this.store.dispatch(NotificationsActions.stopLoading());
            return of(AuthActions.signUpFailure({ error: error.message || 'Erro desconhecido ao cadastrar' }));
          })
        )
      )
    )
  );

  signUpSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUpSuccess),
      tap(() => {
        this.router.navigate(['/auth/sign-in']);
        const msg = localStorage.getItem('lang') === Languages.english ? SIGN_UP_SUCCESS_EN : SIGN_UP_SUCCESS_RU;
        this.store.dispatch(NotificationsActions.setMessage({ msg }));
        this.store.dispatch(NotificationsActions.stopLoading());
      })
    ),
    { dispatch: false }
  );

  signUpFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUpFailure),
      map(action => {
        this.store.dispatch(NotificationsActions.stopLoading());
        return NotificationsActions.setMessage({ msg: action.error });
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        this.restApiService.logout();
        this.localStorageService.removeItem(AUTH_STATE);
        this.store.dispatch(AuthActions.logoutSuccess());
        this.router.navigate(['/auth/sign-in']);
        this.store.dispatch(NotificationsActions.setMessage({ msg: 'Você foi desconectado.' }));
        this.store.dispatch(NotificationsActions.stopLoading());
      })
    ),
    { dispatch: false }
  );

  loadAdditionalUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadAdditionalUserData),
      tap(() => this.store.dispatch(NotificationsActions.startLoading())),
      switchMap(action => zip(
        this.restApiService.getUsers(),
        this.store.select(AuthSelectors.selectUserLogin)
      ).pipe(
        map(([users, userLogin]) => {
          const user = users.find(item => item.login === userLogin);
          if (user) {
            const fullUser: User = {
              id: user._id,
              name: user.name,
              login: user.login,
              role: user.role || 'user'
            };
            return AuthActions.loadAdditionalUserDataSuccess({ user: fullUser });
          } else {
            return AuthActions.loadAdditionalUserDataFailure({ error: 'Dados adicionais do usuário não encontrados.' });
          }
        }),
        catchError(error => {
          this.store.dispatch(NotificationsActions.stopLoading());
          return of(AuthActions.loadAdditionalUserDataFailure({ error: error.message || 'Erro ao carregar dados adicionais.' }));
        })
      ))
    )
  );

  loadAdditionalUserDataSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadAdditionalUserDataSuccess),
      tap(action => {
        const storedState = this.localStorageService.getItem(AUTH_STATE);
        if (storedState) {
          const parsedState = JSON.parse(storedState);
          this.localStorageService.setItem(AUTH_STATE, JSON.stringify({
            ...parsedState,
            user: action.user
          }));
        }
        this.store.dispatch(NotificationsActions.stopLoading());
      })
    ),
    { dispatch: false }
  );

  loadAdditionalUserDataFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadAdditionalUserDataFailure),
      map(action => {
        this.store.dispatch(NotificationsActions.stopLoading());
        return NotificationsActions.setMessage({ msg: action.error });
      })
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.deleteUser),
      tap(() => this.store.dispatch(NotificationsActions.startLoading())),
      switchMap(action =>
        this.restApiService.deleteUserById(action.id).pipe(
          map(() => AuthActions.deleteUserSuccess()),
          catchError(error => {
            this.store.dispatch(NotificationsActions.stopLoading());
            return of(AuthActions.deleteUserFailure({ error: error.message || 'Erro ao deletar usuário.' }));
          })
        )
      )
    )
  );

  deleteUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.deleteUserSuccess),
      tap(() => {
        this.localStorageService.removeItem(AUTH_STATE);
        this.store.dispatch(AuthActions.logoutSuccess());
        this.router.navigate(['/auth/sign-in']);
        this.store.dispatch(NotificationsActions.setMessage({ msg: USER_DELETED }));
        this.store.dispatch(NotificationsActions.stopLoading());
      })
    ),
    { dispatch: false }
  );

  deleteUserFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.deleteUserFailure),
      map(action => {
        this.store.dispatch(NotificationsActions.stopLoading());
        return NotificationsActions.setMessage({ msg: action.error });
      })
    )
  );

  updateUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateUserData),
      tap(() => this.store.dispatch(NotificationsActions.startLoading())),
      switchMap(action =>
        this.restApiService.updateUserById(action.credentials, action.id).pipe(
          map(response => {
            const updatedUser: User = {
              id: response._id || response.id,
              name: response.name,
              login: response.login,
              role: response.role || 'user'
            };
            return AuthActions.updateUserDataSuccess({ user: updatedUser });
          }),
          catchError(error => {
            this.store.dispatch(NotificationsActions.stopLoading());
            return of(AuthActions.updateUserDataFailure({ error: error.message || 'Erro ao atualizar usuário.' }));
          })
        )
      )
    )
  );

  updateUserDataSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateUserDataSuccess),
      tap(action => {
        const storedState = this.localStorageService.getItem(AUTH_STATE);
        if (storedState) {
          const parsedState = JSON.parse(storedState);
          this.localStorageService.setItem(AUTH_STATE, JSON.stringify({
            ...parsedState,
            user: action.user
          }));
        }
        this.router.navigate(['/account']);
        this.store.dispatch(NotificationsActions.setMessage({ msg: USER_UPDATED }));
        this.store.dispatch(NotificationsActions.stopLoading());
      })
    ),
    { dispatch: false }
  );

  updateUserDataFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateUserDataFailure),
      map(action => {
        this.store.dispatch(NotificationsActions.stopLoading());
        return NotificationsActions.setMessage({ msg: action.error });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private restApiService: RestApiService,
    private localStorageService: LocalStorageService,
    private store: Store,
    private router: Router
  ) {}
}