import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoints, getBaseEndpoint, getEndpointWithId } from '../enums/endpoints'; // Caminho para o seu arquivo de Endpoints
import { UserCredentials } from '../../auth/models/user-credentials.model'; // Caminho para UserCredentials
import {
  BoardResponse,
  ColumnResponse,
  TaskResponse,
  UserResponse,
  PointsResponse,
} from '../models/response-api.models'; // Caminho para os modelos de resposta
import { Board } from '../models/board.models'; // Caminho para Board
import { Column, PartialColumnWithOrder } from '../models/column.model'; // Caminho para Column
import { PartialTaskWithOrder, Task, TaskWithColumnId } from '../models/task.models'; // Caminho para Task

// Modelos para as novas entidades
import { Company } from '../models/company.model'; // Caminho para Company
import { Designer } from '../models/designer.model'; // Caminho para Designer
import { Team } from '../models/team.model'; // Caminho para Team

// Se HTTP_OPTIONS for uma constante global, certifique-se de que ela esteja acessível.
// Caso contrário, você pode embuti-la ou passá-la como um argumento.
// Por exemplo:
// import { HTTP_OPTIONS } from '../constants/constants';


@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  // private apiUrl = environment.apiUrl; // Não é mais necessário, pois getBaseEndpoint/getEndpointWithId já usam

  constructor(private http: HttpClient) {}

  // **Métodos HTTP genéricos (melhorados para incluir HTTP_OPTIONS)**
  private getOptions(): { headers?: HttpHeaders } {
    // Retorna suas opções HTTP padrão, como headers de autorização se você tiver um interceptor,
    // ou Content-Type. Se você tem um HTTP_OPTIONS importado, use-o aqui.
    // Exemplo:
    // return HTTP_OPTIONS;
    // Se não tiver, pode ser um objeto vazio ou com headers básicos:
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }


  get<T>(endpoint: Endpoints, id?: string, queryParams?: { [key: string]: string }): Observable<T> {
    const url = id ? getEndpointWithId(endpoint, id) : getBaseEndpoint(endpoint);
    return this.http.get<T>(url, { ...this.getOptions(), params: queryParams });
  }

  post<T>(data: any, endpoint: Endpoints): Observable<T> {
    return this.http.post<T>(getBaseEndpoint(endpoint), data, this.getOptions());
  }

  put<T>(data: any, endpoint: Endpoints, id: string): Observable<T> {
    return this.http.put<T>(getEndpointWithId(endpoint, id), data, this.getOptions());
  }

  patch<T>(data: any, endpoint: Endpoints, id?: string): Observable<T> {
    const url = id ? getEndpointWithId(endpoint, id) : getBaseEndpoint(endpoint);
    return this.http.patch<T>(url, data, this.getOptions());
  }

  delete<T>(endpoint: Endpoints, id: string): Observable<T> {
    return this.http.delete<T>(getEndpointWithId(endpoint, id), this.getOptions());
  }

  // --- Métodos CRUD específicos para Auth, Users, Boards, Columns, Tasks, Points ---

  signIn(credentials: Pick<UserCredentials, 'login' | 'password'>): Observable<{ token: string }> {
    return this.post<{ token: string }>(credentials, Endpoints.AUTH_SIGN_IN);
  }

  signUp(credentials: Required<UserCredentials>): Observable<UserResponse> {
    return this.post<UserResponse>(credentials, Endpoints.AUTH_SIGN_UP);
  }

  updateUserById(credentials: Required<UserCredentials>, id: string): Observable<UserResponse> {
    return this.put<UserResponse>(credentials, Endpoints.USERS, id);
  }

  deleteUserById(id: string): Observable<UserResponse> {
    return this.delete<UserResponse>(Endpoints.USERS, id);
  }

  getUsers(): Observable<Array<UserResponse>> {
    return this.get<Array<UserResponse>>(Endpoints.USERS);
  }

  getBoards(): Observable<Array<BoardResponse>> {
    return this.get<Array<BoardResponse>>(Endpoints.BOARDS);
  }

  createBoard(board: Board): Observable<BoardResponse> {
    return this.post<BoardResponse>(board, Endpoints.BOARDS);
  }

  getBoardById(id: string): Observable<BoardResponse> {
    return this.get<BoardResponse>(Endpoints.BOARDS, id);
  }

  updateBoardById(board: Board, id: string): Observable<BoardResponse> {
    return this.put<BoardResponse>(board, Endpoints.BOARDS, id);
  }

  deleteBoardById(id: string): Observable<BoardResponse> {
    return this.delete<BoardResponse>(Endpoints.BOARDS, id);
  }

  getBoardsByIds(ids: Array<string>): Observable<Array<BoardResponse>> {
    return this.get<Array<BoardResponse>>(Endpoints.BOARDS_SET, undefined, { ids: ids.join(',') });
  }

  getBoardsByUserId(id: string): Observable<Array<BoardResponse>> {
    // Assumindo que este endpoint não precisa de /:id, mas sim de um param de query user id
    return this.get<Array<BoardResponse>>(Endpoints.BOARDS_SET, undefined, { userId: id });
  }

  getColumns(boardId: string): Observable<Array<ColumnResponse>> {
    // Isso requer uma URL complexa: /boards/{boardId}/columns
    // Se seu backend não tem um endpoint específico para isso,
    // vamos precisar construí-lo manualmente ou ajustar o Endpoints.
    // Opção 1: Deixar como estava (funcional mas menos "genérico")
    // return this.http.get<Array<ColumnResponse>>(`${getBaseEndpoint(Endpoints.BOARDS)}/${boardId}${getBaseEndpoint(Endpoints.COLUMN)}`, this.getOptions());
    // Opção 2: Se o backend permite /columns?boardId=...
    return this.get<Array<ColumnResponse>>(Endpoints.COLUMN, undefined, { boardId: boardId });
  }

  createColumn(column: Column, boardId: string): Observable<ColumnResponse> {
    // Opção 1: Deixar como estava
    // return this.http.post<ColumnResponse>(`${getBaseEndpoint(Endpoints.BOARDS)}/${boardId}${getBaseEndpoint(Endpoints.COLUMN)}`, column, this.getOptions());
    // Opção 2: Se o backend permite /columns?boardId=...
    return this.post<ColumnResponse>(column, Endpoints.COLUMN); // Presumindo que 'column' já inclui o boardId, ou que é um header/body implícito
  }

  getColumnById(id: string, boardId: string): Observable<ColumnResponse> {
    // Opção 1: Deixar como estava
    // return this.http.get<ColumnResponse>(`${getBaseEndpoint(Endpoints.BOARDS)}/${boardId}${getBaseEndpoint(Endpoints.COLUMN)}/${id}`, this.getOptions());
    // Opção 2: Se o backend permite /columns/{id}?boardId=... ou se o :id funciona para column
    return this.get<ColumnResponse>(Endpoints.COLUMN, id, { boardId: boardId });
  }

  updateColumnById(column: Column, id: string, boardId: string): Observable<ColumnResponse> {
    // Opção 1: Deixar como estava
    // return this.http.put<ColumnResponse>(`${getBaseEndpoint(Endpoints.BOARDS)}/${boardId}${getBaseEndpoint(Endpoints.COLUMN)}/${id}`, column, this.getOptions());
    // Opção 2:
    return this.put<ColumnResponse>(column, Endpoints.COLUMN, id); // Presumindo que 'column' já inclui o boardId, ou que é um header/body implícito
  }

  deleteColumnById(id: string, boardId: string): Observable<ColumnResponse> {
    // Opção 1: Deixar como estava
    // return this.http.delete<ColumnResponse>(`${getBaseEndpoint(Endpoints.BOARDS)}/${boardId}${getBaseEndpoint(Endpoints.COLUMN)}/${id}`, this.getOptions());
    // Opção 2:
    return this.delete<ColumnResponse>(Endpoints.COLUMN, id); // Se a exclusão não depende do boardId na URL
  }

  getColumnsByIds(ids: Array<string>): Observable<Array<ColumnResponse>> {
    return this.get<Array<ColumnResponse>>(Endpoints.COLUMNS_SET, undefined, { ids: ids.join(',') });
  }

  getColumnsByUserId(id: string): Observable<Array<ColumnResponse>> {
    return this.get<Array<ColumnResponse>>(Endpoints.COLUMNS_SET, undefined, { userId: id });
  }

  updateOrderColumns(columns: Array<PartialColumnWithOrder>): Observable<Array<ColumnResponse>> {
    return this.patch<Array<ColumnResponse>>(columns, Endpoints.COLUMNS_SET); // Usando patch
  }

  createColumns(columns: Array<Required<Column>>): Observable<Array<ColumnResponse>> {
    return this.post<Array<ColumnResponse>>(columns, Endpoints.COLUMNS_SET);
  }

  getTasks(boardId: string, columnId: string): Observable<Array<TaskResponse>> {
    // Isso também requer uma URL complexa: /boards/{boardId}/columns/{columnId}/tasks
    // Aqui, a abordagem de query params é mais complicada. O ideal é ter endpoints mais flat ou
    // construir a URL explicitamente para esses casos aninhados.
    // Mantendo a construção manual para clareza em casos aninhados.
    return this.http.get<Array<TaskResponse>>(
      `${getBaseEndpoint(Endpoints.BOARDS)}/${boardId}${getBaseEndpoint(Endpoints.COLUMN)}/${columnId}${getBaseEndpoint(Endpoints.TASK)}`,
      this.getOptions()
    );
  }

  createTask(task: Task, boardId: string, columnId: string): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(
      `${getBaseEndpoint(Endpoints.BOARDS)}/${boardId}${getBaseEndpoint(Endpoints.COLUMN)}/${columnId}${getBaseEndpoint(Endpoints.TASK)}`,
      task,
      this.getOptions()
    );
  }

  getTaskById(id: string, boardId: string, columnId: string): Observable<TaskResponse> {
    return this.http.get<TaskResponse>(
      `${getBaseEndpoint(Endpoints.BOARDS)}/${boardId}${getBaseEndpoint(Endpoints.COLUMN)}/${columnId}${getBaseEndpoint(Endpoints.TASK)}/${id}`,
      this.getOptions()
    );
  }

  updateTaskById(
    task: TaskWithColumnId,
    id: string,
    boardId: string,
    columnId: string,
  ): Observable<TaskResponse> {
    return this.http.put<TaskResponse>(
      `${getBaseEndpoint(Endpoints.BOARDS)}/${boardId}${getBaseEndpoint(Endpoints.COLUMN)}/${columnId}${getBaseEndpoint(Endpoints.TASK)}/${id}`,
      task,
      this.getOptions()
    );
  }

  deleteTaskById(id: string, boardId: string, columnId: string): Observable<TaskResponse> {
    return this.http.delete<TaskResponse>(
      `${getBaseEndpoint(Endpoints.BOARDS)}/${boardId}${getBaseEndpoint(Endpoints.COLUMN)}/${columnId}${getBaseEndpoint(Endpoints.TASK)}/${id}`,
      this.getOptions()
    );
  }

  getTasksByIds(ids: Array<string>): Observable<Array<TaskResponse>> {
    return this.get<Array<TaskResponse>>(Endpoints.TASKS_SET, undefined, { ids: ids.join(',') });
  }

  getTasksByUserId(id: string): Observable<Array<TaskResponse>> {
    return this.get<Array<TaskResponse>>(Endpoints.TASKS_SET, undefined, { userId: id });
  }

  getTasksByKeyword(keyword: string): Observable<Array<TaskResponse>> {
    return this.get<Array<TaskResponse>>(Endpoints.TASKS_SET, undefined, { search: keyword });
  }

  updateOrderTasks(tasks: Array<PartialTaskWithOrder>): Observable<Array<TaskResponse>> {
    return this.patch<Array<TaskResponse>>(tasks, Endpoints.TASKS_SET);
  }

  getTasksByBoardId(id: string): Observable<Array<TaskResponse>> {
    // Isso pode ser ajustado para usar get(Endpoints.TASKS_SET, undefined, { boardId: id })
    // se o backend aceitar. Mantenho a construção manual por enquanto.
    return this.get<Array<TaskResponse>>(Endpoints.TASKS_SET, undefined, { boardId: id });
  }

  getPointsByTaskId(id: string): Observable<Array<PointsResponse>> {
    return this.get<Array<PointsResponse>>(Endpoints.POINTS, id); // Assumindo /points/:id
  }

  createPoint(point: Omit<PointsResponse, '_id'>): Observable<PointsResponse> {
    return this.post<PointsResponse>(point, Endpoints.POINTS);
  }

  updatePointsById(
    point: Pick<PointsResponse, 'title' | 'done'>,
    id: string,
  ): Observable<PointsResponse> {
    return this.patch<PointsResponse>(point, Endpoints.POINTS, id); // Usando patch
  }

  deletePointsById(id: string): Observable<PointsResponse> {
    return this.delete<PointsResponse>(Endpoints.POINTS, id);
  }

  // --- Métodos CRUD específicos para as novas entidades (já estavam no seu primeiro código) ---

  // Companies (RF01)
  createCompany(company: Company): Observable<Company> {
    return this.post<Company>(company, Endpoints.COMPANIES);
  }

  getCompanies(): Observable<Company[]> {
    return this.get<Company[]>(Endpoints.COMPANIES);
  }

  getCompanyById(id: string): Observable<Company> {
    return this.get<Company>(Endpoints.COMPANIES, id); // Usando getEndpointWithId
  }

  updateCompany(id: string, company: Company): Observable<Company> {
    return this.put<Company>(company, Endpoints.COMPANIES, id);
  }

  deleteCompany(id: string): Observable<void> {
    return this.delete<void>(Endpoints.COMPANIES, id);
  }

  // Designers (RF02)
  createDesigner(designer: Designer): Observable<Designer> {
    return this.post<Designer>(designer, Endpoints.DESIGNERS);
  }

  getDesigners(companyId?: string): Observable<Designer[]> {
    // Adaptação para query params se seu backend usa ?companyId=
    return this.get<Designer[]>(Endpoints.DESIGNERS, undefined, companyId ? { companyId } : undefined);
  }

  getDesignerById(id: string): Observable<Designer> {
    return this.get<Designer>(Endpoints.DESIGNERS, id);
  }

  updateDesigner(id: string, designer: Designer): Observable<Designer> {
    return this.put<Designer>(designer, Endpoints.DESIGNERS, id);
  }

  deleteDesigner(id: string): Observable<void> {
    return this.delete<void>(Endpoints.DESIGNERS, id);
  }

  // Teams (RF03)
  createTeam(team: Team): Observable<Team> {
    return this.post<Team>(team, Endpoints.TEAMS);
  }

  getTeams(companyId?: string): Observable<Team[]> {
    // Adaptação para query params se seu backend usa ?companyId=
    return this.get<Team[]>(Endpoints.TEAMS, undefined, companyId ? { companyId } : undefined);
  }

  getTeamById(id: string): Observable<Team> {
    return this.get<Team>(Endpoints.TEAMS, id);
  }

  updateTeam(id: string, team: Team): Observable<Team> {
    return this.put<Team>(team, Endpoints.TEAMS, id);
  }

  deleteTeam(id: string): Observable<void> {
    return this.delete<void>(Endpoints.TEAMS, id);
  }
}