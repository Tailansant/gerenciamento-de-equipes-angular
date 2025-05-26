import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardsState } from '../states/boards.state';

export const getBoardsState = createFeatureSelector<BoardsState>('boardsState');

export const getBoards = createSelector(getBoardsState, (boardsState) => boardsState.boards);
