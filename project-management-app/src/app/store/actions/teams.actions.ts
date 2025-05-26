import { createAction, props } from '@ngrx/store';
import { Team } from '../../core/models/team.model';

export const loadTeams = createAction(
    '[Teams API] Load Teams',
    props<{ companyId?: string }>() // Pode ser filtrado por companyId
);

export const loadTeamsSuccess = createAction(
    '[Teams API] Load Teams Success',
    props<{ teams: Team[] }>()
);

export const loadTeamsFailure = createAction(
    '[Teams API] Load Teams Failure',
    props<{ error: any }>()
);

export const createTeam = createAction(
    '[Teams Page] Create Team',
    props<{ team: Team }>()
);

export const createTeamSuccess = createAction(
    '[Teams API] Create Team Success',
    props<{ team: Team }>()
);

export const createTeamFailure = createAction(
    '[Teams API] Create Team Failure',
    props<{ error: any }>()
);

export const updateTeam = createAction(
    '[Teams Page] Update Team',
    props<{ id: string; team: Team }>()
);

export const updateTeamSuccess = createAction(
    '[Teams API] Update Team Success',
    props<{ team: Team }>()
);

export const updateTeamFailure = createAction(
    '[Teams API] Update Team Failure',
    props<{ error: any }>()
);

export const deleteTeam = createAction(
    '[Teams Page] Delete Team',
    props<{ id: string }>()
);

export const deleteTeamSuccess = createAction(
    '[Teams API] Delete Team Success',
    props<{ id: string }>()
);

export const deleteTeamFailure = createAction(
    '[Teams API] Delete Team Failure',
    props<{ error: any }>()
);

export const selectTeam = createAction(
    '[Teams Page] Select Team',
    props<{ teamId: string | null }>()
);