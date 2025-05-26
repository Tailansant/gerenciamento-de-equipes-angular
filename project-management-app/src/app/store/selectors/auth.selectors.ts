import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../states/auth.state'; 
import { AppState } from '../app.state'; 
import { UserRole } from 'src/app/core/enums/user-role.enum';

export const selectAuthState = createFeatureSelector<AppState, AuthState>('auth');

// 2. Seletores para o status de autenticação e detalhes do usuário
export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated // Retorna o status de autenticação
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading // Retorna o status de carregamento
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.errorMessage // Retorna a mensagem de erro
);

export const selectCurrentUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user // Retorna o objeto User completo
);

export const selectAuthToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token // Retorna o token de autenticação
);

export const selectCurrentUserId = createSelector(
  selectCurrentUser,
  (user) => user ? user.id : null // Retorna o ID do usuário, se houver
);

export const selectUserLogin = createSelector(
  selectCurrentUser,
  (user) => user ? user.login : null // Retorna o login do usuário, se houver
);

export const selectUserName = createSelector(
  selectCurrentUser,
  (user) => user ? user.name : null // Retorna o nome do usuário, se houver
);

export const selectUserRole = createSelector(
  selectCurrentUser,
  (user) => user ? user.role : null // Retorna o papel do usuário, se houver
);

export const selectUserCompanyId = createSelector(
  selectCurrentUser,
  (user) => user ? user.companyId : null // Retorna o companyId do usuário, se houver
);

export const selectIsAdmin = createSelector(
  selectUserRole,
  (role) => role === UserRole.ADMIN // Verifica se o papel é ADMIN
);

export const selectIsCompany = createSelector(
  selectUserRole,
  (role) => role === UserRole.COMPANY // Verifica se o papel é COMPANY
);

export const selectIsDesigner = createSelector(
  selectUserRole,
  (role) => role === UserRole.DESIGNER 
);