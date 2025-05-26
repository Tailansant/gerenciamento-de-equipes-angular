import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthSelectors from '../../store/selectors/auth.selectors'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private store: Store, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.checkAuthentication();
  }

  canLoad(): Observable<boolean | UrlTree> {
    return this.checkAuthentication();
  }

  private checkAuthentication(): Observable<boolean | UrlTree> {
    return this.store.select(AuthSelectors.selectIsAuthenticated).pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        } else {
          // Redireciona para a página de login
          this.router.navigate(['/auth/sign-in']);
          return false;
        }
      })
    );
  }
}