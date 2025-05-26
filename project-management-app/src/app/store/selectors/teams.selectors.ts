import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../state.models';
import { TeamsState } from '../states/teams.state';

export const selectTeamsState = createFeatureSelector<AppState, TeamsState>('teams');

export const selectAllTeams = createSelector(
    selectTeamsState,
    (state: TeamsState) => state.teams
);

export const selectTeamsLoading = createSelector(
    selectTeamsState,
    (state: TeamsState) => state.loading
);

export const selectTeamsError = createSelector(
    selectTeamsState,
    (state: TeamsState) => state.error
);

export const selectSelectedTeam = createSelector(
    selectTeamsState,
    (state: TeamsState) => state.selectedTeam
);