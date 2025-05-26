import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, first, map, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Languages } from 'src/app/core/constants/l10n-config';
import { RestApiService } from '../../core/services/rest-api.service';
import {
  addCreatedBoard,
  createBoard,
  deleteBoard,
  initUserBoards,
  updateBoardsState,
} from '../actions/boards.actions';
import { getUserId } from '../selectors/auth.selectors';
import { loaded, setMessage } from '../actions/notifications.actions';
import {
  BOARD_CREATED_EN,
  BOARD_CREATED_RU,
  BOARD_DELETED_EN,
  BOARD_DELETED_RU,
} from '../../core/constants/constants';

@Injectable()
export class BoardsEffects {
  createBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createBoard),
      switchMap((action) => {
        return this.restApiService.getUsers().pipe(
          filter((response) => response !== null),
          map((users) => {
            return users
              .filter((user) => {
                return !!action.payload.members.find((member) => member === user.login);
              })
              .map((user) => {
                return user._id;
              });
          }),
          map((users) => {
            return { ...action.payload, members: users };
          }),
          switchMap((rawBoard) => {
            return this.store.select(getUserId).pipe(
              first(),
              switchMap((userId) => {
                return this.restApiService
                  .createBoard({
                    title: rawBoard.name,
                    owner: userId!,
                    users: rawBoard.members.filter((memberId) => memberId !== userId!),
                  })
                  .pipe(
                    filter((response) => response !== null),
                    map((board) => addCreatedBoard({ payload: board })),
                  );
              }),
            );
          }),
          tap(() => {
            if (localStorage.getItem('lang') === Languages.english) {
              this.store.dispatch(setMessage({ msg: BOARD_CREATED_EN }));
            } else {
              this.store.dispatch(setMessage({ msg: BOARD_CREATED_RU }));
            }
            this.store.dispatch(loaded());
          }),
        );
      }),
    ),
  );

  initUserBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initUserBoards),
      switchMap(() => {
        return this.store.select(getUserId).pipe(
          first(),
          switchMap((userId) => {
            return this.restApiService.getBoardsByUserId(userId!).pipe(
              filter((response) => response !== null),
              map((boards) => updateBoardsState({ payload: boards })),
            );
          }),
          tap(() => {
            this.store.dispatch(loaded());
          }),
        );
      }),
    ),
  );

  deleteBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteBoard),
      switchMap((action) => {
        return this.restApiService.deleteBoardById(action.boardId).pipe(
          filter((response) => response !== null),
          map(() => initUserBoards()),
          tap(() => {
            if (localStorage.getItem('lang') === Languages.english) {
              this.store.dispatch(setMessage({ msg: BOARD_DELETED_EN }));
            } else {
              this.store.dispatch(setMessage({ msg: BOARD_DELETED_RU }));
            }
          }),
        );
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private restApiService: RestApiService,
    private store: Store,
  ) {}
}
