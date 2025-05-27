import { AuthState } from './store/states/auth.state';
import { BoardState } from './store/states/board.state';
import { BoardsState } from './store/states/boards.state';
import { NotificationsState } from './store/states/notifications.state';
import { SearchState } from './store/states/search.state';
import { CompaniesState } from './store/states/companies.state';
import { DesignersState } from './store/states/designers.state';
import { TeamsState } from './store/states/teams.state';

export interface AppState {
  auth: AuthState;
  board: BoardState;
  boards: BoardsState;
  notifications: NotificationsState;
  search: SearchState;
  companies: CompaniesState;
  designers: DesignersState;
  teams: TeamsState;
}
