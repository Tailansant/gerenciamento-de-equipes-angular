import { BoardResponse } from '../../core/models/response-api.models';

export interface BoardsState {
  boards: Array<BoardResponse>;
}

export const initialState: BoardsState = {
  boards: [],
};
