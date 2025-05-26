import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, zip } from 'rxjs'; 
import { catchError, map, mergeMap, switchMap, tap, filter } from 'rxjs/operators'; 
import { Router } from '@angular/router';
import { Store } from '@ngrx/store'; 

import * as AuthActions from '../actions/auth.actions';
import * as NotificationsActions from '../actions/notifications.actions';
import * as AuthSelectors from '../selectors/auth.selectors';

import { RestApiService } from 'src/app/core/services/rest-api.service'; // Se RestApiService faz as chamadas diretas
import { LocalStorageService } from 'src/app/core/services/local-storage.service'; // Para localStorage

import { User } from 'src/app/core/models/user.model'; // Para o modelo User
import {
  AUTH_STATE,
  SIGN_IN_SUCCESS_EN,
  SIGN_IN_SUCCESS_RU,
  SIGN_UP_SUCCESS_EN,
  SIGN_UP_SUCCESS_RU,
  USER_DELETED,
  USER_UPDATED,
} from 'src/app/core/constants/constants'; // Para constantes de mensagem e localStorage
import { Languages } from 'src/app/core/constants/l10n-config'; // Para idiomas

@Injectable()
export class AuthEffects {
  // Efeito para inicializar o estado de autenticação a partir do localStorage
  updateAuthStateFromLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateAuthStateFromLocalStorage),
      switchMap(() => {
        const state = this.localStorageService.getItem(AUTH_STATE);
        if (state) {
          const parsedState = JSON.parse(state);
          // O estado agora inclui `user` completo e `token`
          return of(AuthActions.updateAuthStateFromLocalStorage({
            user: parsedState.user,
            token: parsedState.token,
            isAuthenticated: !!parsedState.token, // Ou !!parsedState.user
          }));
        }
        // Se não houver estado no localStorage, inicializa com valores padrão
        return of(AuthActions.updateAuthStateFromLocalStorage({
          user: null,
          token: null,
          isAuthenticated: false
        }));
      })
    )
  );

  // Efeito para o processo de Sign In
  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      tap(() => this.store.dispatch(NotificationsActions.startLoading())), // Inicia carregamento
      switchMap(action =>
        this.restApiService.signIn(action.credentials).pipe( // Usando restApiService
          map(response => {
            const user: User = { // Construa o objeto User a partir da resposta
              id: response.id || response._id, // Assumindo que a resposta pode ter 'id' ou '_id'
              name: response.name,
              login: response.login,
              role: response.role || 'user' // Define um papel padrão se não vier na resposta
            };
            return AuthActions.signInSuccess({ user, token: response.token });
          }),
          catchError(error => {
            this.store.dispatch(NotificationsActions.stopLoading()); // Para carregamento em caso de erro
            return of(AuthActions.signInFailure({ error: error.message || 'Erro desconhecido ao fazer login' }));
          })
        )
      )
    )
  );

  // Efeito após o sucesso do Sign In
  signInSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signInSuccess),
      tap(action => {
        // Persiste o estado de autenticação (user e token) no localStorage
        this.localStorageService.setItem(AUTH_STATE, JSON.stringify({
          isAuthenticated: true,
          user: action.user,
          token: action.token
        }));
        this.router.navigate(['/boards']); // Redireciona para /boards
        const msg = localStorage.getItem('lang') === Languages.english ? SIGN_IN_SUCCESS_EN : SIGN_IN_SUCCESS_RU;
        this.store.dispatch(NotificationsActions.setMessage({ msg })); // Exibe mensagem de sucesso
        this.store.dispatch(NotificationsActions.stopLoading()); // Para carregamento
      })
    ),
    { dispatch: false } // Não dispara uma nova ação, apenas efeitos colaterais
  );

  // Efeito para o fracasso do Sign In
  signInFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signInFailure),
      map(action => {
        this.store.dispatch(NotificationsActions.stopLoading()); // Para carregamento
        return NotificationsActions.setMessage({ msg: action.error }); // Exibe mensagem de erro
      })
    )
  );

  // Efeito para o processo de Sign Up
  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      tap(() => this.store.dispatch(NotificationsActions.startLoading())), // Inicia carregamento
      switchMap(action =>
        this.restApiService.signUp(action.credentials).pipe(
          map(response => {
            const user: User = { // Construa o objeto User a partir da resposta
              id: response.id || response._id,
              name: response.name,
              login: response.login,
              role: 'user' // Papel padrão para novos cadastros
            };
            return AuthActions.signUpSuccess({ user });
          }),
          catchError(error => {
            this.store.dispatch(NotificationsActions.stopLoading()); // Para carregamento em caso de erro
            return of(AuthActions.signUpFailure({ error: error.message || 'Erro desconhecido ao cadastrar' }));
          })
        )
      )
    )
  );

  // Efeito após o sucesso do Sign Up
  signUpSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUpSuccess),
      tap(() => {
        this.router.navigate(['/auth/sign-in']); // Redireciona para a página de login
        const msg = localStorage.getItem('lang') === Languages.english ? SIGN_UP_SUCCESS_EN : SIGN_UP_SUCCESS_RU;
        this.store.dispatch(NotificationsActions.setMessage({ msg })); // Exibe mensagem de sucesso
        this.store.dispatch(NotificationsActions.stopLoading()); // Para carregamento
      })
    ),
    { dispatch: false }
  );

  // Efeito para o fracasso do Sign Up
  signUpFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUpFailure),
      map(action => {
        this.store.dispatch(NotificationsActions.stopLoading()); // Para carregamento
        return NotificationsActions.setMessage({ msg: action.error }); // Exibe mensagem de erro
      })
    )
  );

  // Efeito para o processo de Logout
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        this.restApiService.logout(); // Chama o método de logout no serviço de API
        this.localStorageService.removeItem(AUTH_STATE); // Remove o estado do localStorage
        this.store.dispatch(AuthActions.logoutSuccess()); // Dispara ação de sucesso para o reducer
        this.router.navigate(['/auth/sign-in']); // Redireciona para a página de login
        this.store.dispatch(NotificationsActions.setMessage({ msg: 'Você foi desconectado.' })); // Mensagem
        this.store.dispatch(NotificationsActions.stopLoading()); // Para carregamento
      })
    ),
    { dispatch: false }
  );

  // Efeito para buscar dados adicionais do usuário (após login, se necessário)
  loadAdditionalUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadAdditionalUserData),
      tap(() => this.store.dispatch(NotificationsActions.startLoading())),
      switchMap(action => zip(
        this.restApiService.getUsers(), // Assume que getUsers retorna Observable<UserResponse[]>
        this.store.select(AuthSelectors.selectUserLogin) // Obtenha o login do store
      ).pipe(
        map(([users, userLogin]) => {
          const user = users.find(item => item.login === userLogin);
          if (user) {
            const fullUser: User = {
              id: user._id,
              name: user.name,
              login: user.login,
              role: user.role || 'user' // Assegure que o papel esteja presente
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
        // Atualiza o user no localStorage se necessário, ou confia no reducer
        const storedState = this.localStorageService.getItem(AUTH_STATE);
        if (storedState) {
          const parsedState = JSON.parse(storedState);
          this.localStorageService.setItem(AUTH_STATE, JSON.stringify({
            ...parsedState,
            user: action.user // Atualiza o objeto user completo
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

  // Efeito para deletar usuário
  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.deleteUser),
      tap(() => this.store.dispatch(NotificationsActions.startLoading())),
      switchMap(action =>
        this.restApiService.deleteUserById(action.id).pipe( // Usar action.id
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
        this.localStorageService.removeItem(AUTH_STATE); // Garante que o estado seja limpo
        this.store.dispatch(AuthActions.logoutSuccess()); // Dispara logout para limpar o estado NgRx
        this.router.navigate(['/auth/sign-in']); // Redireciona para o login
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

  // Efeito para atualizar dados do usuário
  updateUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateUserData),
      tap(() => this.store.dispatch(NotificationsActions.startLoading())),
      switchMap(action =>
        this.restApiService.updateUserById(action.credentials, action.id).pipe(
          map(response => {
            const updatedUser: User = { // Construa o objeto User atualizado
              id: response._id || response.id,
              name: response.name,
              login: response.login,
              role: response.role || 'user' // Mantém ou define o papel
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
        // Atualiza o user no localStorage após a atualização bem-sucedida
        const storedState = this.localStorageService.getItem(AUTH_STATE);
        if (storedState) {
          const parsedState = JSON.parse(storedState);
          this.localStorageService.setItem(AUTH_STATE, JSON.stringify({
            ...parsedState,
            user: action.user // Atualiza o objeto user completo
          }));
        }
        this.router.navigate(['/account']); // Redireciona para a página da conta
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
    private restApiService: RestApiService, // Prefira usar RestApiService para chamadas de API
    private localStorageService: LocalStorageService,
    private store: Store,
    private router: Router
  ) {}
}