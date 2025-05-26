import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { RestApiService } from '../../core/services/rest-api.service';
import * as TeamsActions from '../actions/teams.actions';
import * as NotificationsActions from '../actions/notifications.actions';
import { Router } from '@angular/router';

@Injectable()
export class TeamsEffects {
    loadTeams$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TeamsActions.loadTeams),
            mergeMap((action) =>
                this.restApiService.getTeams(action.companyId).pipe(
                    map((teams) => TeamsActions.loadTeamsSuccess({ teams })),
                    catchError((error) => of(TeamsActions.loadTeamsFailure({ error })))
                )
            )
        )
    );

    createTeam$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TeamsActions.createTeam),
            mergeMap((action) =>
                this.restApiService.createTeam(action.team).pipe(
                    map((team) => {
                        this.router.navigate(['/company/teams']); // Redireciona após criação
                        return TeamsActions.createTeamSuccess({ team });
                    }),
                    catchError((error) => {
                        return of(TeamsActions.createTeamFailure({ error }));
                    })
                )
            )
        )
    );

    updateTeam$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TeamsActions.updateTeam),
            mergeMap((action) =>
                this.restApiService.updateTeam(action.id, action.team).pipe(
                    map((team) => {
                        this.router.navigate(['/company/teams']); // Redireciona após atualização
                        return TeamsActions.updateTeamSuccess({ team });
                    }),
                    catchError((error) => of(TeamsActions.updateTeamFailure({ error })))
                )
            )
        )
    );

    deleteTeam$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TeamsActions.deleteTeam),
            mergeMap((action) =>
                this.restApiService.deleteTeam(action.id).pipe(
                    map(() => TeamsActions.deleteTeamSuccess({ id: action.id })),
                    catchError((error) => of(TeamsActions.deleteTeamFailure({ error })))
                )
            )
        )
    );

    // Efeitos para mostrar notificações de sucesso/erro (similar ao CompaniesEffects)
    teamsSuccessNotifications$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                TeamsActions.createTeamSuccess,
                TeamsActions.updateTeamSuccess,
                TeamsActions.deleteTeamSuccess
            ),
            map(action => {
                let message = '';
                if (action.type === TeamsActions.createTeamSuccess.type) {
                    message = 'Equipe criada com sucesso!';
                } else if (action.type === TeamsActions.updateTeamSuccess.type) {
                    message = 'Equipe atualizada com sucesso!';
                } else if (action.type === TeamsActions.deleteTeamSuccess.type) {
                    message = 'Equipe excluída com sucesso!';
                }
                return NotificationsActions.showNotification({ message, type: 'success' });
            })
        )
    );

    teamsFailureNotifications$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                TeamsActions.loadTeamsFailure,
                TeamsActions.createTeamFailure,
                TeamsActions.updateTeamFailure,
                TeamsActions.deleteTeamFailure
            ),
            map(action => NotificationsActions.showNotification({ message: action.error.message || 'Ocorreu um erro na equipe', type: 'error' }))
        )
    );

    constructor(
        private actions$: Actions,
        private restApiService: RestApiService,
        private router: Router
    ) { }
}