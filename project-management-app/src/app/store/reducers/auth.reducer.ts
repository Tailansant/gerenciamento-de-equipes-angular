import { createReducer, on } from '@ngrx/store';
import { initialState } from '../states/auth.state'; 
import * as AuthActions from '../actions/auth.actions';

export const authReducer = createReducer(
  initialState, 

  // Ação de início de Sign In
  on(AuthActions.signIn, state => ({
    ...state,
    loading: true,
    errorMessage: null // Limpa qualquer erro anterior
  })),

  // Ação de sucesso de Sign In
  on(AuthActions.signInSuccess, (state, { user, token }) => ({
    ...state,
    isAuthenticated: true,
    user: user, 
    token: token,
    loading: false,
    errorMessage: null
  })),

  // Ação de falha de Sign In
  on(AuthActions.signInFailure, (state, { error }) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    token: null, 
    loading: false,
    errorMessage: error 
  })),

  // Ação de início de Sign Up
  on(AuthActions.signUp, state => ({
    ...state,
    loading: true,
    errorMessage: null
  })),

  // Ação de sucesso de Sign Up (apenas indica que o cadastro foi bem-sucedido)
  on(AuthActions.signUpSuccess, state => ({
    ...state,
    loading: false,
    errorMessage: null
  })),

  // Ação de falha de Sign Up
  on(AuthActions.signUpFailure, (state, { error }) => ({
    ...state,
    loading: false,
    errorMessage: error 
  })),

  // Ação de início de atualização de dados do usuário
  on(AuthActions.updateUserData, state => ({
    ...state,
    loading: true,
    errorMessage: null,
  })),

  // Ação de sucesso de atualização de dados do usuário
  on(AuthActions.updateUserDataSuccess, (state, { user }) => ({
    ...state,
    user: user,
    loading: false,
    errorMessage: null,
  })),

  // Ação de falha de atualização de dados do usuário
  on(AuthActions.updateUserDataFailure, (state, { error }) => ({
    ...state,
    loading: false,
    errorMessage: error,
  })),

  // Ação de início de exclusão de usuário
  on(AuthActions.deleteUser, state => ({
    ...state,
    loading: true,
    errorMessage: null,
  })),

  // Ação de sucesso de exclusão de usuário (o logout será tratado por um effect)
  on(AuthActions.deleteUserSuccess, state => ({
    ...state,
    loading: false,
    errorMessage: null,
    
  })),

  // Ação de falha de exclusão de usuário
  on(AuthActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    errorMessage: error,
  })),

  // Ação de início de carregamento de dados adicionais do usuário
  on(AuthActions.loadAdditionalUserData, state => ({
    ...state,
    loading: true,
    errorMessage: null,
  })),

  // Ação de sucesso de carregamento de dados adicionais do usuário
  on(AuthActions.loadAdditionalUserDataSuccess, (state, { user }) => ({
    ...state,
    user: user, 
    loading: false,
    errorMessage: null,
  })),

  // Ação de falha de carregamento de dados adicionais do usuário
  on(AuthActions.loadAdditionalUserDataFailure, (state, { error }) => ({
    ...state,
    loading: false,
    errorMessage: error,
  })),

  // Ação de logout
  
  on(AuthActions.logout, () => ({
    ...initialState 
  })),

  // Ação de sucesso de logout (redundante se 'logout' já reseta, mas pode ser útil para efeitos colaterais)
  on(AuthActions.logoutSuccess, () => ({
    ...initialState 
  })),

  // Ação para atualizar o estado de autenticação a partir do Local Storage
  on(AuthActions.updateAuthStateFromLocalStorage, (state, { user, token, isAuthenticated }) => ({
    ...state,
    isAuthenticated: isAuthenticated,
    user: user,
    token: token,
    loading: false, 
    errorMessage: null,
  })),
);