import { createReducer, on } from '@ngrx/store';
import { initialState } from '../states/search.state';
import { startSearchState, updateSearchState } from '../actions/search.actions';

export const searchReducer = createReducer(
  initialState,
  on(startSearchState, (state, action) => {
    return { ...state, value: action.value };
  }),
  on(updateSearchState, (state, action) => {
    return { ...state, tasks: action.payload };
  }),
);
