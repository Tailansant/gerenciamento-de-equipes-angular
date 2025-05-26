import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { logOut } from 'src/app/store/actions/auth.actions';
import { loaded, setMessage } from 'src/app/store/actions/notifications.actions';
import { Store } from '@ngrx/store';
import { AUTH_STATE } from '../constants/constants';
import { Languages } from '../constants/l10n-config';
import {
  BAD_REQUEST_EN,
  BAD_REQUEST_RU,
  FORBIDDEN_EN,
  FORBIDDEN_RU,
  LOGIN_EXISTS_EN,
  LOGIN_EXISTS_RU,
  NOT_FOUND_EN,
  NOT_FOUND_RU,
  ResponseCode,
  UNAUTHORIZED_EN,
  UNAUTHORIZED_RU,
} from '../constants/errors';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === ResponseCode.BAD_REQUEST) {
          if (localStorage.getItem('lang') === Languages.english) {
            this.store.dispatch(setMessage({ msg: BAD_REQUEST_EN }));
          } else {
            this.store.dispatch(setMessage({ msg: BAD_REQUEST_RU }));
          }
          this.store.dispatch(loaded());
          return of(new HttpResponse({ body: null }));
        }
        if (error.status === ResponseCode.UNAUTHORIZED) {
          if (localStorage.getItem(AUTH_STATE)) {
            if (localStorage.getItem('lang') === Languages.english) {
              this.store.dispatch(setMessage({ msg: FORBIDDEN_EN }));
            } else {
              this.store.dispatch(setMessage({ msg: FORBIDDEN_RU }));
            }
            this.store.dispatch(logOut());
          }
          if (!localStorage.getItem(AUTH_STATE)) {
            if (localStorage.getItem('lang') === Languages.english) {
              this.store.dispatch(setMessage({ msg: UNAUTHORIZED_EN }));
            } else {
              this.store.dispatch(setMessage({ msg: UNAUTHORIZED_RU }));
            }
          }
          this.store.dispatch(loaded());
          return of(new HttpResponse({ body: null }));
        }
        if (error.status === ResponseCode.FORBIDDEN) {
          if (localStorage.getItem('lang') === Languages.english) {
            this.store.dispatch(setMessage({ msg: FORBIDDEN_EN }));
          } else {
            this.store.dispatch(setMessage({ msg: FORBIDDEN_RU }));
          }
          this.store.dispatch(logOut());
          return of(new HttpResponse({ body: null }));
        }
        if (error.status === ResponseCode.NOT_FOUND) {
          if (localStorage.getItem('lang') === Languages.english) {
            this.store.dispatch(setMessage({ msg: NOT_FOUND_EN }));
          } else {
            this.store.dispatch(setMessage({ msg: NOT_FOUND_RU }));
          }
          this.store.dispatch(loaded());
          return of(new HttpResponse({ body: null }));
        }
        if (error.status === ResponseCode.LOGIN_EXISTS) {
          if (localStorage.getItem('lang') === Languages.english) {
            this.store.dispatch(setMessage({ msg: LOGIN_EXISTS_EN }));
          } else {
            this.store.dispatch(setMessage({ msg: LOGIN_EXISTS_RU }));
          }
          this.store.dispatch(loaded());
          return of(new HttpResponse({ body: null }));
        }
        this.store.dispatch(setMessage({ msg: error.message }));
        this.store.dispatch(loaded());
        return of(new HttpResponse({ body: null }));
      }),
    );
  }
}
