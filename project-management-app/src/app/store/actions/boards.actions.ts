import { createAction, props } from '@ngrx/store';
import { BoardResponse } from '../../core/models/response-api.models';
import { RawBoard } from '../../core/models/board.models';

export const initUserBoards = createAction('INIT_USER_BOARDS');

export const updateBoardsState = createAction(
  'UPDATE_BOARDS_STATE',
  props<{ payload: Array<BoardResponse> }>(),
);

export const addCreatedBoard = createAction(
  'ADD_CREATED_BOARD',
  props<{ payload: BoardResponse }>(),
);

export const createBoard = createAction('CREATE_BOARD', props<{ payload: RawBoard }>());

export const deleteBoard = createAction('DELETE_BOARD', props<{ boardId: string }>());
