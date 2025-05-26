import { Team } from 'src/app/core/models/team.model';

export interface TeamsState {
    teams: Team[];
    loading: boolean;
    error: any;
    selectedTeam: Team | null;
}

export const initialTeamsState: TeamsState = {
    teams: [],
    loading: false,
    error: null,
    selectedTeam: null,
};