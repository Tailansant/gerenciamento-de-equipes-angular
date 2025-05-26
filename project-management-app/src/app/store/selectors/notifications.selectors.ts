import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NotificationsState } from '../states/notifications.state';

export const getNotificationsState =
  createFeatureSelector<NotificationsState>('notificationsState');

export const getMessage = createSelector(
  getNotificationsState,
  (notificationsStateState) => notificationsStateState.msg,
);

export const getLoadStatus = createSelector(
  getNotificationsState,
  (notificationsStateState) => notificationsStateState.isLoading,
);
