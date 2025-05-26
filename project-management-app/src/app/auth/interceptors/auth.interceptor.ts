import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { first, mergeMap, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { getAuthToken } from '../../store/selectors/auth.selectors';
import { APP_API_URL, TOKEN_HEADER_KEY, TOKEN_TYPE } from '../../core/constants/constants';
import { loading } from '../../store/actions/notifications.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.pipe(
      first(),
      select(getAuthToken),
      mergeMap((token) => {
        this.store.dispatch(loading());
        if (token) {
          const moddedHttpRequest = request.clone({
            headers: request.headers.set(TOKEN_HEADER_KEY, `${TOKEN_TYPE}${token}`),
            url: `${APP_API_URL}${request.url}`,
          });
          return next.handle(moddedHttpRequest);
        }
        return next.handle(request.clone({ url: `${APP_API_URL}${request.url}` }));
      }),
    );
  }
}
