import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { L10nLocale, L10N_LOCALE } from 'angular-l10n';
import { getAuthState } from '../../../store/selectors/auth.selectors';
import { getAdditionalUserData, signIn } from '../../../store/actions/auth.actions';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
})
export class SignInPageComponent implements OnInit, OnDestroy {
  signInForm: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  subscription = new Subscription();

  hide = true;

  constructor(private store: Store, @Inject(L10N_LOCALE) public locale: L10nLocale) {}

  ngOnInit() {
    const subToken = this.store.select(getAuthState).subscribe((authState) => {
      if (authState.token && !authState.name) {
        this.store.dispatch(getAdditionalUserData());
      }
    });
    this.subscription.add(subToken);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  displayFormControlErrorMessage(formControlName: string, typeError: string): boolean {
    return (
      this.signInForm.controls[formControlName].hasError(typeError) &&
      this.signInForm.controls[formControlName].touched
    );
  }

  submit() {
    this.store.dispatch(signIn({ payload: this.signInForm.value }));
  }

  toggleHide() {
    this.hide = !this.hide;
  }
}
