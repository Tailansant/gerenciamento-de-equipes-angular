import { createReducer, on } from '@ngrx/store';
import { initialState } from '../states/boards.state';
import { addCreatedBoard, updateBoardsState } from '../actions/boards.actions';

export const boardsReducer = createReducer(
  initialState,
  on(updateBoardsState, (state, action) => {
    return { ...state, boards: action.payload };
  }),
  on(addCreatedBoard, (state, action) => {
    return { ...state, boards: [...state.boards, action.payload] };
  }),
);
