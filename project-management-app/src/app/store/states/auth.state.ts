import { User } from 'src/app/core/models/user.model'; 

export interface AuthState {
  isAuthenticated: boolean; 
  user: User | null;
  token: string | null; 
  errorMessage: string | null; 
  loading: boolean; 
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  errorMessage: null,
  loading: false,
};