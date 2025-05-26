import { createAction, props } from '@ngrx/store';
import { UserCredentials } from 'src/app/auth/models/user-credentials.model'; //

// Ações para o fluxo de Sign In / Sign Up
export const signIn = createAction(
  '[Auth] Sign In',
  props<{ credentials: Pick<UserCredentials, 'login' | 'password'> }>()
);

export const signInSuccess = createAction(
  '[Auth API] Sign In Success',
  props<{ user: User; token: string }>() 
);

export const signInFailure = createAction(
  '[Auth API] Sign In Failure',
  props<{ error: string }>()
);

export const signUp = createAction(
  '[Auth] Sign Up',
  props<{ credentials: Required<UserCredentials> }>()
);

export const signUpSuccess = createAction(
  '[Auth API] Sign Up Success',
  props<{ user: User }>() 
);

export const signUpFailure = createAction(
  '[Auth API] Sign Up Failure',
  props<{ error: string }>()
);

// Ações para o fluxo de Logout
export const logout = createAction(
  '[Auth] Logout' 
);

export const logoutSuccess = createAction(
  '[Auth] Logout Success'
);

// Ações para atualização e exclusão de dados do usuário
export const updateUserData = createAction(
  '[User] Update User Data',
  props<{ credentials: Required<Pick<UserCredentials, 'name' | 'login' | 'password'>>; id: string }>() 
);

export const updateUserDataSuccess = createAction(
  '[User API] Update User Data Success',
  props<{ user: User }>()
);

export const updateUserDataFailure = createAction(
  '[User API] Update User Data Failure',
  props<{ error: string }>()
);

export const deleteUser = createAction(
  '[User] Delete User',
  props<{ id: string }>()
);

export const deleteUserSuccess = createAction(
  '[User API] Delete User Success'
);

export const deleteUserFailure = createAction(
  '[User API] Delete User Failure',
  props<{ error: string }>()
);

// Ações para inicialização do estado de autenticação (e.g., do localStorage)
export const updateAuthStateFromLocalStorage = createAction(
  '[Auth] Update Auth State From Local Storage',
  props<{ user: User | null; token: string | null; isAuthenticated: boolean }>() 
);

// Ação para buscar dados adicionais do usuário (se necessário)
export const loadAdditionalUserData = createAction(
  '[Auth] Load Additional User Data',
  props<{ userId: string }>()
);

export const loadAdditionalUserDataSuccess = createAction(
  '[Auth API] Load Additional User Data Success',
  props<{ user: User }>()
);

export const loadAdditionalUserDataFailure = createAction(
  '[Auth API] Load Additional User Data Failure',
  props<{ error: string }>()
);