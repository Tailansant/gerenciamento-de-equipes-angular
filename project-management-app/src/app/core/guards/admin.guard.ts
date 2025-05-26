import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthSelectors from '../../store/selectors/auth.selectors';
import { UserRole } from '../enums/user-role.enum';

@Injectable({
providedIn: 'root'
})
export class AdminGuard implements CanActivate {

constructor(private store: Store, private router: Router) {}

canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(AuthSelectors.selectUserRole).pipe(
    map(role => {
        if (role === UserRole.ADMIN) {
        return true;
        } else {
          this.router.navigate(['/unauthorized']); 
        return false;
        }
    })
    );
}
}