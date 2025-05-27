import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../states/auth.state';
import { AppState } from 'src/app/app.state';
import { UserRole } from 'src/app/core/enums/user-role.enum';

export const selectAuthState = createFeatureSelector<AppState, AuthState>('auth');

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated // Retorna o status de autenticação
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.errorMessage
);

export const selectCurrentUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const selectAuthToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);

export const selectCurrentUserId = createSelector(
  selectCurrentUser,
  (user) => user ? user.id : null
);

export const selectUserLogin = createSelector(
  selectCurrentUser,
  (user) => !user ? null : user.login
);

export const selectUserName = createSelector(
  selectCurrentUser,
  (user) => user ? user.name : null
);

export const selectUserRole = createSelector(
  selectCurrentUser,
  (user) => user ? user.role : null
);

export const selectUserCompanyId = createSelector(
  selectCurrentUser,
  (user) => user ? user.companyId : null
);

export const selectIsAdmin = createSelector(
  selectUserRole,
  (role) => role === UserRole.ADMIN
);

export const selectIsCompany = createSelector(
  selectUserRole,
  (role) => role === UserRole.COMPANY
);

export const selectIsDesigner = createSelector(
  selectUserRole,
  (role) => role === UserRole.DESIGNER
);

export class getAuthToken {
  constructor() {

  }

}
