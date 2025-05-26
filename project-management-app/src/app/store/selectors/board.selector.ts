import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardState } from '../states/board.state';

export const getBoardState = createFeatureSelector<BoardState>('boardState');

export const getBoard = createSelector(getBoardState, (boardState) => boardState);
