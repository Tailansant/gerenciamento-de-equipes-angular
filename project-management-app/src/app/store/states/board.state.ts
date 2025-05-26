import { BoardResponse, ColumnResponse, TaskResponse } from '../../core/models/response-api.models';

export interface ColumnWithTasks extends ColumnResponse {
  tasks: TaskResponse[];
}

export interface BoardState extends BoardResponse {
  columns: Array<ColumnWithTasks>;
}

export const initialState: BoardState = {
  _id: '',
  users: [],
  columns: [],
  title: '',
  owner: '',
};
