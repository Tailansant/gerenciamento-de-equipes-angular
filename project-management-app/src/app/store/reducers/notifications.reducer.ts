import { createReducer, on } from '@ngrx/store';
import { clearMessage, loaded, loading, setMessage } from '../actions/notifications.actions';
import { initialState } from '../states/notifications.state';

export const notificationsReducer = createReducer(
  initialState,
  on(setMessage, (state, action) => {
    return { ...state, msg: action.msg };
  }),
  on(clearMessage, (state) => {
    return { ...state, msg: null };
  }),
  on(loading, (state) => {
    return { ...state, isLoading: true };
  }),
  on(loaded, (state) => {
    return { ...state, isLoading: false };
  }),
);
