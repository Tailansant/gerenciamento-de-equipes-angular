import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { RestApiService } from '../../core/services/rest-api.service';
import * as CompaniesActions from '../actions/companies.actions';
import * as NotificationsActions from '../actions/notifications.actions';
import { Router } from '@angular/router'; 
@Injectable()
export class CompaniesEffects {
loadCompanies$ = createEffect(() =>
    this.actions$.pipe(
    ofType(CompaniesActions.loadCompanies),
    mergeMap(() =>
        this.restApiService.getCompanies().pipe(
        map((companies) => CompaniesActions.loadCompaniesSuccess({ companies })),
        catchError((error) => of(CompaniesActions.loadCompaniesFailure({ error })))
        )
    )
    )
);

createCompany$ = createEffect(() =>
    this.actions$.pipe(
    ofType(CompaniesActions.createCompany),
    mergeMap((action) =>
        this.restApiService.createCompany(action.company).pipe(
        map((company) => {
            this.router.navigate(['/admin/companies']); // Redireciona após criação
            return CompaniesActions.createCompanySuccess({ company });
        }),
        catchError((error) => {
            return of(CompaniesActions.createCompanyFailure({ error }));
        })
        )
    )
    )
);

updateCompany$ = createEffect(() =>
    this.actions$.pipe(
    ofType(CompaniesActions.updateCompany),
    mergeMap((action) =>
        this.restApiService.updateCompany(action.id, action.company).pipe(
        map((company) => {
            this.router.navigate(['/admin/companies']); // Redireciona após atualização
            return CompaniesActions.updateCompanySuccess({ company });
        }),
        catchError((error) => of(CompaniesActions.updateCompanyFailure({ error })))
        )
    )
    )
);

deleteCompany$ = createEffect(() =>
    this.actions$.pipe(
    ofType(CompaniesActions.deleteCompany),
    mergeMap((action) =>
        this.restApiService.deleteCompany(action.id).pipe(
        map(() => CompaniesActions.deleteCompanySuccess({ id: action.id })),
        catchError((error) => of(CompaniesActions.deleteCompanyFailure({ error })))
        )
    )
    )
);

  // Efeitos para mostrar notificações de sucesso/erro
companiesSuccessNotifications$ = createEffect(() =>
    this.actions$.pipe(
    ofType(
        CompaniesActions.createCompanySuccess,
        CompaniesActions.updateCompanySuccess,
        CompaniesActions.deleteCompanySuccess
    ),
    map(action => {
        let message = '';
        if (action.type === CompaniesActions.createCompanySuccess.type) {
        message = 'Empresa criada com sucesso!';
        } else if (action.type === CompaniesActions.updateCompanySuccess.type) {
        message = 'Empresa atualizada com sucesso!';
        } else if (action.type === CompaniesActions.deleteCompanySuccess.type) {
        message = 'Empresa excluída com sucesso!';
        }
        return NotificationsActions.showNotification({ message, type: 'success' });
    })
    )
);

companiesFailureNotifications$ = createEffect(() =>
    this.actions$.pipe(
    ofType(
        CompaniesActions.loadCompaniesFailure,
        CompaniesActions.createCompanyFailure,
        CompaniesActions.updateCompanyFailure,
        CompaniesActions.deleteCompanyFailure
    ),
    map(action => NotificationsActions.showNotification({ message: action.error.message || 'Ocorreu um erro na empresa', type: 'error' }))
    )
);

constructor(
    private actions$: Actions,
    private restApiService: RestApiService,
    private router: Router
) {}
}