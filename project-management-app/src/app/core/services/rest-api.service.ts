
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoints, getBaseEndpoint, getEndpointWithId } from '../enums/endpoints';
import { UserCredentials } from '../../auth/models/user-credentials.model';
import {
  BoardResponse,
  ColumnResponse,
  TaskResponse,
  UserResponse,
  PointsResponse,
} from '../models/response-api.models';
import { Board } from '../models/board.models';
import { Column, PartialColumnWithOrder } from '../models/column.model';
import { PartialTaskWithOrder, Task, TaskWithColumnId } from '../models/task.models';

import { Company } from '../models/company.model';
import { Designer } from '../models/designer.model';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {

  constructor(private http: HttpClient) {}

  private getOptions(): { headers?: HttpHeaders } {
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
    return this.get<Array<BoardResponse>>(Endpoints.BOARDS_SET, undefined, { userId: id });
  }

  getColumns(boardId: string): Observable<Array<ColumnResponse>> {
    return this.get<Array<ColumnResponse>>(Endpoints.COLUMN, undefined, { boardId: boardId });
  }

  createColumn(column: Column, boardId: string): Observable<ColumnResponse> {
    return this.post<ColumnResponse>(column, Endpoints.COLUMN);
  }

  getColumnById(id: string, boardId: string): Observable<ColumnResponse> {
    return this.get<ColumnResponse>(Endpoints.COLUMN, id, { boardId: boardId });
  }

  updateColumnById(column: Column, id: string, boardId: string): Observable<ColumnResponse> {
    return this.put<ColumnResponse>(column, Endpoints.COLUMN, id);
  }

  deleteColumnById(id: string, boardId: string): Observable<ColumnResponse> {
    return this.delete<ColumnResponse>(Endpoints.COLUMN, id);
  }

  getColumnsByIds(ids: Array<string>): Observable<Array<ColumnResponse>> {
    return this.get<Array<ColumnResponse>>(Endpoints.COLUMNS_SET, undefined, { ids: ids.join(',') });
  }

  getColumnsByUserId(id: string): Observable<Array<ColumnResponse>> {
    return this.get<Array<ColumnResponse>>(Endpoints.COLUMNS_SET, undefined, { userId: id });
  }

  updateOrderColumns(columns: Array<PartialColumnWithOrder>): Observable<Array<ColumnResponse>> {
    return this.patch<Array<ColumnResponse>>(columns, Endpoints.COLUMNS_SET);
  }

  createColumns(columns: Array<Required<Column>>): Observable<Array<ColumnResponse>> {
    return this.post<Array<ColumnResponse>>(columns, Endpoints.COLUMNS_SET);
  }

  getTasks(boardId: string, columnId: string): Observable<Array<TaskResponse>> {
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
    return this.get<Array<TaskResponse>>(Endpoints.TASKS_SET, undefined, { boardId: id });
  }

  getPointsByTaskId(id: string): Observable<Array<PointsResponse>> {
    return this.get<Array<PointsResponse>>(Endpoints.POINTS, id);
  }

  createPoint(point: Omit<PointsResponse, '_id'>): Observable<PointsResponse> {
    return this.post<PointsResponse>(point, Endpoints.POINTS);
  }

  updatePointsById(
    point: Pick<PointsResponse, 'title' | 'done'>,
    id: string,
  ): Observable<PointsResponse> {
    return this.patch<PointsResponse>(point, Endpoints.POINTS, id);
  }

  deletePointsById(id: string): Observable<PointsResponse> {
    return this.delete<PointsResponse>(Endpoints.POINTS, id);
  }

  createCompany(company: Company): Observable<Company> {
    return this.post<Company>(company, Endpoints.COMPANIES);
  }

  getCompanies(): Observable<Company[]> {
    return this.get<Company[]>(Endpoints.COMPANIES);
  }

  getCompanyById(id: string): Observable<Company> {
    return this.get<Company>(Endpoints.COMPANIES, id);
  }

  updateCompany(id: string, company: Company): Observable<Company> {
    return this.put<Company>(company, Endpoints.COMPANIES, id);
  }

  deleteCompany(id: string): Observable<void> {
    return this.delete<void>(Endpoints.COMPANIES, id);
  }

  createDesigner(designer: Designer): Observable<Designer> {
    return this.post<Designer>(designer, Endpoints.DESIGNERS);
  }

  getDesigners(companyId?: string): Observable<Designer[]> {
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

  createTeam(team: Team): Observable<Team> {
    return this.post<Team>(team, Endpoints.TEAMS);
  }

  getTeams(companyId?: string): Observable<Team[]> {
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