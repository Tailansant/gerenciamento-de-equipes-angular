import { HttpHeaders } from '@angular/common/http';

export const APP_API_URL = '';
export const TOKEN_HEADER_KEY = 'Authorization';
export const TOKEN_TYPE = 'Bearer ';

export const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
export const AUTH_STATE = 'AUTH_STATE';

export const SIGN_IN_SUCCESS_EN = 'Welcome!';
export const SIGN_IN_SUCCESS_RU = 'Welcome!'; 
export const SIGN_UP_SUCCESS_EN = 'Success! Use your login and password for sign in!';
export const SIGN_UP_SUCCESS_RU = 'Success! Use your login and password for sign in!'; 
export const BOARD_CREATED_EN = 'Board was created!';
export const BOARD_CREATED_RU = 'Board was created!'; 
export const BOARD_DELETED_EN = 'Board was deleted!';
export const BOARD_DELETED_RU = 'Board was deleted!'; 
export const USER_DELETED = 'User was deleted!'; 
export const USER_UPDATED = 'New user data was successfully saved!';