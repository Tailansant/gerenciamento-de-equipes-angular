export interface NotificationsState {
  msg: string | null;
  isLoading: boolean;
}

export const initialState: NotificationsState = {
  msg: null,
  isLoading: false,
};
