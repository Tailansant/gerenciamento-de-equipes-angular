import { createAction, props } from '@ngrx/store';
import { TaskResponse } from 'src/app/core/models/response-api.models';

export const startSearchState = createAction(
  'START_SEARCH_STATE',
  props<{ userId: string; value: string }>(),
);

export const updateSearchState = createAction(
  'UPDATE_SEARCH_STATE',
  props<{ payload: TaskResponse[] }>(),
);
