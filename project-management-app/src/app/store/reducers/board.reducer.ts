import { createReducer, on } from '@ngrx/store';
import { BoardState, initialState } from '../states/board.state';
import {
  addCreatedColumn,
  addCreatedTask,
  deleteColumn,
  deleteTask,
  setColumnsOrder,
  transformDataAfterInit,
  updateColumn,
  updateTask,
} from '../actions/board.actions';

export const boardReducer = createReducer(
  initialState,
  on(transformDataAfterInit, (state, action) => {
    const result = { ...state, ...action.board, columns: action.columns } as BoardState;
    result.columns = result.columns
      .map((column) => {
        return {
          ...column,
          tasks: action.tasks
            .filter((task) => task.columnId === column._id)
            .sort((taskA, taskB) => taskA.order - taskB.order),
        };
      })
      .sort((columnA, columnB) => columnA.order - columnB.order);
    return result;
  }),
  on(setColumnsOrder, (state, action) => {
    return { ...state, columns: action.columns };
  }),
  on(addCreatedColumn, (state, action) => {
    return { ...state, columns: [...state.columns, { ...action.column, tasks: [] }] };
  }),
  on(deleteColumn, (state, action) => {
    const deletionIndex = state.columns.findIndex((column) => column._id === action.column._id);
    const newColumns = [...state.columns];
    newColumns.splice(deletionIndex, 1);
    return { ...state, columns: [...newColumns] };
  }),
  on(updateColumn, (state, action) => {
    const columnIndex = state.columns.findIndex((column) => column._id === action.column._id);
    const newColumns = [...state.columns];
    newColumns[columnIndex] = action.column;
    return { ...state, columns: [...newColumns] };
  }),
  on(addCreatedTask, (state, action) => {
    const unfrozenState = JSON.parse(JSON.stringify(state)) as BoardState;
    const columnIndex = unfrozenState.columns.findIndex(
      (column) => column._id === action.task.columnId,
    );
    unfrozenState.columns[columnIndex].tasks.push(action.task);
    return { ...unfrozenState };
  }),
  on(updateTask, (state, action) => {
    const unfrozenState = JSON.parse(JSON.stringify(state)) as BoardState;
    const columnIndex = state.columns.findIndex((column) => column._id === action.task.columnId);
    const taskIndex = state.columns[columnIndex].tasks.findIndex(
      (task) => task._id === action.task._id,
    );
    unfrozenState.columns[columnIndex].tasks[taskIndex] = { ...action.task };
    return { ...unfrozenState };
  }),
  on(deleteTask, (state, action) => {
    const unfrozenState = JSON.parse(JSON.stringify(state)) as BoardState;
    const columnIndex = state.columns.findIndex((column) => column._id === action.task.columnId);
    const taskIndex = state.columns[columnIndex].tasks.findIndex(
      (task) => task._id === action.task._id,
    );
    unfrozenState.columns[columnIndex].tasks.splice(taskIndex, 1);
    return { ...unfrozenState };
  }),
);
