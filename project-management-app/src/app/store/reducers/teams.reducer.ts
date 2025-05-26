import { createReducer, on } from '@ngrx/store';
import { initialTeamsState } from '../states/teams.state';
import * as TeamsActions from '../actions/teams.actions';

export const teamsReducer = createReducer(
    initialTeamsState,
    on(TeamsActions.loadTeams, state => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(TeamsActions.loadTeamsSuccess, (state, { teams }) => ({
        ...state,
        teams: teams,
        loading: false,
        error: null,
    })),
    on(TeamsActions.loadTeamsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: error,
    })),
    on(TeamsActions.createTeam, state => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(TeamsActions.createTeamSuccess, (state, { team }) => ({
        ...state,
        teams: [...state.teams, team],
        loading: false,
        error: null,
    })),
    on(TeamsActions.createTeamFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: error,
    })),
    on(TeamsActions.updateTeam, state => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(TeamsActions.updateTeamSuccess, (state, { team }) => ({
        ...state,
        teams: state.teams.map(t => (t.id === team.id ? team : t)),
        loading: false,
        error: null,
    })),
    on(TeamsActions.updateTeamFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: error,
    })),
    on(TeamsActions.deleteTeam, state => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(TeamsActions.deleteTeamSuccess, (state, { id }) => ({
        ...state,
        teams: state.teams.filter(team => team.id !== id),
        loading: false,
        error: null,
    })),
    on(TeamsActions.deleteTeamFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: error,
    })),
    on(TeamsActions.selectTeam, (state, { teamId }) => ({
        ...state,
        selectedTeam: teamId ? state.teams.find(t => t.id === teamId) || null : null,
    }))
);