export enum ResponseCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  LOGIN_EXISTS = 409,
}

export const BAD_REQUEST_EN = 'Something is wrong, please check your request.';
export const BAD_REQUEST_RU = 'Something is wrong, please check your request.'; 

export const UNAUTHORIZED_EN =
  'The username or password you entered is incorrect, please try again.';
export const UNAUTHORIZED_RU =
  'The username or password you entered is incorrect, please try again.'; 

export const NOT_FOUND_EN = 'The item you searched for was not found.';
export const NOT_FOUND_RU = 'The item you searched for was not found.'; 

export const FORBIDDEN_EN = 'Access denied. Your token might be invalid or expired. Please sign in again.';
export const FORBIDDEN_RU =
  'Access denied. Your token might be invalid or expired. Please sign in again.'; 

export const LOGIN_EXISTS_EN =
  'An account with this email already exists. Please log in using this email address or use another email for registration.';
export const LOGIN_EXISTS_RU =
  'An account with this email already exists. Please log in using this email address or use another email for registration.'; 