export interface UserResponse {
  _id: string;
  name: string;
  login: string;
}

export interface BoardResponse {
  _id: string;
  title: string;
  owner: string;
  users: Array<string>;
}

export interface ColumnResponse {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

export interface TaskResponse {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: number;
  users: Array<string>;
}

export interface PointsResponse {
  _id: string;
  title: string;
  taskId: string;
  boardId: string;
  done: boolean;
}
