import { ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './reducers/auth.reducer';
import { AuthState } from './states/auth.state';
import { AuthEffects } from './effects/auth.effects';
import { BoardsState } from './states/boards.state';
import { boardsReducer } from './reducers/boards.reducer';
import { BoardsEffects } from './effects/boards.effects';
import { notificationsReducer } from './reducers/notifications.reducer';
import { NotificationsState } from './states/notifications.state';
import { BoardState } from './states/board.state';
import { boardReducer } from './reducers/board.reducer';
import { BoardEffects } from './effects/board.effects';
import { searchReducer } from './reducers/search.reducer';
import { SearchState } from './states/search.state';
import { SearchEffects } from './effects/search.effects';

export interface AppState {
  authState: AuthState;
  boardsState: BoardsState;
  boardState: BoardState;
  notificationsState: NotificationsState;
  searchState: SearchState;
  companies: CompaniesState; // 
  designers: DesignersState; // 
  teams: TeamsState; // 
}

export const reducers: ActionReducerMap<AppState> = {
  authState: authReducer,
  boardsState: boardsReducer,
  boardState: boardReducer,
  notificationsState: notificationsReducer,
  searchState: searchReducer,
};

export const effects = EffectsModule.forRoot([
  AuthEffects,
  BoardsEffects,
  BoardEffects,
  SearchEffects,
]);
