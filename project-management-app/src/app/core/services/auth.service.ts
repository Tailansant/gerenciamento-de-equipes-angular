import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { RestApiService } from './rest-api.service';
import { User } from '../models/user.model';
import { UserCredentials } from 'src/app/auth/models/user-credentials.model'; // Assumindo que você tem isso

@Injectable({
providedIn: 'root'
})
export class AuthService {
private currentUserSubject: BehaviorSubject<User | null>;
public currentUser: Observable<User | null>;

constructor(
    private localStorageService: LocalStorageService,
    private restApiService: RestApiService // Para login/signup
) {
    const user = this.localStorageService.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(user ? JSON.parse(user) : null);
    this.currentUser = this.currentUserSubject.asObservable();
}

public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
}

signIn(credentials: UserCredentials): Observable<any> {
    return this.restApiService.post(credentials, Endpoints.AUTH_SIGN_IN).pipe(
    tap((response: { token: string, user: User }) => {
        this.localStorageService.setItem('authToken', response.token);
        this.localStorageService.setItem('currentUser', JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
    })
    );
}

signUp(user: UserCredentials): Observable<any> {
    return this.restApiService.post(user, Endpoints.AUTH_SIGN_UP);
}

logout(): void {
    this.localStorageService.removeItem('authToken');
    this.localStorageService.removeItem('currentUser');
    this.currentUserSubject.next(null);
}
}