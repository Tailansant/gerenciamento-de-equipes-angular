import { environment } from 'app/environments/environment';

export enum Endpoints {
  AUTH_SIGN_IN = '/auth/signin',
  AUTH_SIGN_UP = '/auth/signup',

  BOARDS = '/boards',
  BOARDS_SET = '/boardsSet',

  COLUMN = '/columns',
  COLUMNS_SET = '/columnsSet',

  TASK = '/tasks',
  TASKS_SET = '/tasksSet',

  USERS = '/users',
  POINTS = '/points',

  COMPANIES = '/companies',
  DESIGNERS = '/designers',
  TEAMS = '/teams',
}

export function getEndpointWithId(endpoint: Endpoints, id: string): string {
  if (endpoint.includes('/:id')) {
    return environment.apiUrl + endpoint.replace(':id', id);
  }
  return environment.apiUrl + endpoint + '/' + id;
}

export function getBaseEndpoint(endpoint: Endpoints): string {
  return environment.apiUrl + endpoint;
}
