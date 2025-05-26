import { createAction, props } from '@ngrx/store';

export const setMessage = createAction('SET_MESSAGE', props<{ msg: string | null }>());

export const clearMessage = createAction('CLEAR_MESSAGE');

export const loading = createAction('LOADING');

export const loaded = createAction('LOADED');
