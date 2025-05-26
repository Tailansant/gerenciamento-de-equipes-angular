import { environment } from 'environments/environment'; // Garanta que este caminho está correto para seu ambiente

export enum Endpoints {
  // Endpoints de autenticação existentes
  AUTH_SIGN_IN = '/auth/signin', // Ajustado para 'signin' conforme seu código existente
  AUTH_SIGN_UP = '/auth/signup', // Ajustado para 'signup' conforme seu código existente

  // Endpoints de boards existentes
  BOARDS = '/boards',
  BOARDS_SET = '/boardsSet',

  // Endpoints de colunas existentes
  COLUMN = '/columns', // Ajustado para singular 'column' se esse for o padrão
  COLUMNS_SET = '/columnsSet',

  // Endpoints de tarefas existentes
  TASK = '/tasks', // Ajustado para singular 'task' se esse for o padrão
  TASKS_SET = '/tasksSet',

  // Endpoints de usuários/pontos existentes
  USERS = '/users',
  POINTS = '/points',

  // Novos endpoints para Companies, Designers, Teams
  COMPANIES = '/companies',
  DESIGNERS = '/designers',
  TEAMS = '/teams',
}

// Função utilitária para substituir o ID no endpoint e adicionar a URL base
export function getEndpointWithId(endpoint: Endpoints, id: string): string {
  // Certifique-se de que o 'id' seja usado para substituir o ':id' no enum
  // e que o endpoint seja um dos que realmente têm ':id' no valor base,
  // ou adapte a lógica para o seu backend.
  // Por exemplo, se COMPANIES não tiver :id, você usaria getBaseEndpoint.
  if (endpoint.includes('/:id')) { // Verifica se o enum inclui ':id'
    return environment.apiUrl + endpoint.replace(':id', id);
  }
  // Fallback para endpoints que não usam :id, mas recebem um ID como parâmetro
  return environment.apiUrl + endpoint + '/' + id; // Ex: /companies/123
}


// Função utilitária para obter o endpoint base com a URL da API
export function getBaseEndpoint(endpoint: Endpoints): string {
  return environment.apiUrl + endpoint;
}