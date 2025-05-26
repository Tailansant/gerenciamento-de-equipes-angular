import { TaskResponse } from 'src/app/core/models/response-api.models';

export interface SearchState {
  value: string | null;
  tasks: Array<TaskResponse> | null;
}

export const initialState: SearchState = {
  value: null,
  tasks: null,
};
