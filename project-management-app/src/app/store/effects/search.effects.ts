import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, tap } from 'rxjs';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { loaded } from '../actions/notifications.actions';
import { startSearchState, updateSearchState } from '../actions/search.actions';

@Injectable()
export class SearchEffects {
  constructor(
    private actions$: Actions,
    private restApiService: RestApiService,
    private store: Store,
    private router: Router,
  ) {}

  getSearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startSearchState),
      switchMap((action) =>
        this.restApiService.getTasksByUserId(action.userId).pipe(
          map((resp) => updateSearchState({ payload: resp })),
          tap(() => {
            this.store.dispatch(loaded());
            this.router.navigate(['boards/search']);
          }),
        ),
      ),
    ),
  );
}
