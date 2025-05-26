import { User } from 'src/app/core/models/user.model'; // Verifique o caminho para o seu modelo User

export interface AuthState {
  isAuthenticated: boolean; // Indica se o usuário está autenticado
  user: User | null; // Objeto User completo, que deve incluir id, name, login e role
  token: string | null; // Token de autenticação
  errorMessage: string | null; // Mensagens de erro relacionadas à autenticação
  loading: boolean; // Indicador de carregamento para operações de autenticação
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  errorMessage: null,
  loading: false,
};