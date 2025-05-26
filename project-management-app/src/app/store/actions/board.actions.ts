import { createAction, props } from '@ngrx/store';
import { BoardResponse, ColumnResponse, TaskResponse } from '../../core/models/response-api.models';
import { ColumnWithTasks } from '../states/board.state';
import { Column } from '../../core/models/column.model';
import { Task } from '../../core/models/task.models';

export const initBoardState = createAction('INIT_BOARD_STATE', props<{ id: string }>());
export const transformDataAfterInit = createAction(
  'TRANSFORM_DATA_AFTER_INIT',
  props<{ board: BoardResponse; columns: Array<ColumnResponse>; tasks: Array<TaskResponse> }>(),
);

export const setColumnsOrderOnServer = createAction(
  'SET_COLUMNS_ORDER_ON_SERVER',
  props<{ columns: Array<ColumnWithTasks> }>(),
);

export const setColumnsOrder = createAction(
  'SET_COLUMNS_ORDER',
  props<{ columns: Array<ColumnWithTasks> }>(),
);

export const setTasksOrderOnServer = createAction(
  'SET_TASKS_ORDER_ON_SERVER',
  props<{ tasks: Array<TaskResponse>; newColumnId: string }>(),
);

export const createColumn = createAction(
  'CREATE_COLUMN',
  props<{ column: Column; boardId: string }>(),
);

export const addCreatedColumn = createAction(
  'ADD_CREATED_COLUMN',
  props<{ column: ColumnResponse }>(),
);

export const deleteColumnOnServer = createAction(
  'DELETE_COLUMN_ON_SERVER',
  props<{ column: ColumnWithTasks }>(),
);

export const deleteColumn = createAction('DELETE_COLUMN', props<{ column: ColumnWithTasks }>());

export const updateColumnOnServer = createAction(
  'UPDATE_COLUMN_ON_SERVER',
  props<{ column: ColumnWithTasks }>(),
);

export const updateColumn = createAction('UPDATE_COLUMN', props<{ column: ColumnWithTasks }>());

export const createTaskOnServer = createAction(
  'CREATE_TASK_ON_SERVER',
  props<{ task: Task; boardId: string; columnId: string }>(),
);

export const addCreatedTask = createAction('ADD_CREATED_TASK', props<{ task: TaskResponse }>());

export const updateTaskOnServer = createAction(
  'UPDATE_TASK_ON_SERVER',
  props<{ task: TaskResponse }>(),
);

export const updateTask = createAction('UPDATE_TASK', props<{ task: TaskResponse }>());

export const deleteTaskOnServer = createAction(
  'DELETE_TASK_ON_SERVER',
  props<{ task: TaskResponse }>(),
);

export const deleteTask = createAction('DELETE_TASK', props<{ task: TaskResponse }>());
