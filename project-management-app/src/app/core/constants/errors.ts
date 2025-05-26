export enum ResponseCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  LOGIN_EXISTS = 409,
}

export const BAD_REQUEST_EN = 'Something is wrong, please check your request';
export const BAD_REQUEST_RU = 'Что-то пошло не так. Пожалуйста, проверьте ваш запрос';

export const UNAUTHORIZED_EN =
  'The username or password you entered is incorrect, please try again';
export const UNAUTHORIZED_RU =
  'Введенный вами логин и/или пароль неверны. Пожалуйста, попробуйте еще раз';

export const NOT_FOUND_EN = 'The item you searched is not found';
export const NOT_FOUND_RU = 'Запрашиваемый ресурс не найден.';

export const FORBIDDEN_EN = 'Your token is invalid, please sign in to your account';
export const FORBIDDEN_RU =
  'Неверны авторизационные данные, указанные в запросе, или запрещен доступ к запрашиваемому ресурсу. ';

export const LOGIN_EXISTS_EN =
  'An account with this email already exists. Please login using this email address or use another email.';
export const LOGIN_EXISTS_RU =
  'Аккаунт с указанной почтой уже существует. Пожалуйста, войдите в аккаунт, используя данную почту или воспользуйтесь другой почтой для регистрации';
