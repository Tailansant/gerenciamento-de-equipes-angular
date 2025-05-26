import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { RestApiService } from '../../core/services/rest-api.service';
import * as DesignersActions from '../actions/designers.actions';
import * as NotificationsActions from '../actions/notifications.actions';
import { Router } from '@angular/router';

@Injectable()
export class DesignersEffects {
loadDesigners$ = createEffect(() =>
    this.actions$.pipe(
    ofType(DesignersActions.loadDesigners),
    mergeMap((action) =>
        this.restApiService.getDesigners(action.companyId).pipe(
        map((designers) => DesignersActions.loadDesignersSuccess({ designers })),
        catchError((error) => of(DesignersActions.loadDesignersFailure({ error })))
        )
    )
    )
);

createDesigner$ = createEffect(() =>
    this.actions$.pipe(
    ofType(DesignersActions.createDesigner),
    mergeMap((action) =>
        this.restApiService.createDesigner(action.designer).pipe(
        map((designer) => {
            this.router.navigate(['/company/designers']); // Redireciona após criação
            return DesignersActions.createDesignerSuccess({ designer });
        }),
        catchError((error) => {
            return of(DesignersActions.createDesignerFailure({ error }));
        })
        )
    )
    )
);

updateDesigner$ = createEffect(() =>
    this.actions$.pipe(
    ofType(DesignersActions.updateDesigner),
    mergeMap((action) =>
        this.restApiService.updateDesigner(action.id, action.designer).pipe(
        map((designer) => {
            this.router.navigate(['/company/designers']); // Redireciona após atualização
            return DesignersActions.updateDesignerSuccess({ designer });
        }),
        catchError((error) => of(DesignersActions.updateDesignerFailure({ error })))
        )
    )
    )
);

deleteDesigner$ = createEffect(() =>
    this.actions$.pipe(
    ofType(DesignersActions.deleteDesigner),
    mergeMap((action) =>
        this.restApiService.deleteDesigner(action.id).pipe(
        map(() => DesignersActions.deleteDesignerSuccess({ id: action.id })),
        catchError((error) => of(DesignersActions.deleteDesignerFailure({ error })))
        )
    )
    )
);

  // Efeitos para mostrar notificações de sucesso/erro (similar ao CompaniesEffects)
designersSuccessNotifications$ = createEffect(() =>
    this.actions$.pipe(
    ofType(
        DesignersActions.createDesignerSuccess,
        DesignersActions.updateDesignerSuccess,
        DesignersActions.deleteDesignerSuccess
    ),
    map(action => {
        let message = '';
        if (action.type === DesignersActions.createDesignerSuccess.type) {
        message = 'Projetista criado com sucesso!';
        } else if (action.type === DesignersActions.updateDesignerSuccess.type) {
        message = 'Projetista atualizado com sucesso!';
        } else if (action.type === DesignersActions.deleteDesignerSuccess.type) {
        message = 'Projetista excluído com sucesso!';
        }
        return NotificationsActions.showNotification({ message, type: 'success' });
    })
    )
);

designersFailureNotifications$ = createEffect(() =>
    this.actions$.pipe(
    ofType(
        DesignersActions.loadDesignersFailure,
        DesignersActions.createDesignerFailure,
        DesignersActions.updateDesignerFailure,
        DesignersActions.deleteDesignerFailure
    ),
    map(action => NotificationsActions.showNotification({ message: action.error.message || 'Ocorreu um erro no projetista', type: 'error' }))
    )
);

constructor(
    private actions$: Actions,
    private restApiService: RestApiService,
    private router: Router
) {}
}