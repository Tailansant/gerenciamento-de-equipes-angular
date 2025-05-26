import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { MatDialog } from '@angular/material/dialog';
import { L10nLocale, L10N_LOCALE } from 'angular-l10n';
import { PasswordErrorStateMatcher } from './password-error-state-matcher';
import { signUp } from '../../../store/actions/auth.actions';
import { PasswordHasCapitalAndSmallCaseValidator } from '../../directives/password-has-capital-and-small-case.directive';
import { PasswordHasLettersAndNumbersValidator } from '../../directives/password-has-letters-and-numbers.directive';
import { PasswordHasSpecialCharacterValidator } from '../../directives/password-has-special-character.directive';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPageComponent {
  signUpForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.maxLength(32)]),
      login: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        PasswordHasCapitalAndSmallCaseValidator(),
        PasswordHasLettersAndNumbersValidator(),
        PasswordHasSpecialCharacterValidator(),
      ]),
      repeatPassword: new FormControl('', [Validators.required]),
    },
    this.passwordEquals,
  );

  passwordEqualsMatcher = new PasswordErrorStateMatcher();

  hide = true;

  hideRepeat = true;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    @Inject(L10N_LOCALE) public locale: L10nLocale,
  ) {}

  displayFormControlErrorMessage(formControlName: string, typeError: string): boolean {
    return (
      this.signUpForm.controls[formControlName].hasError(typeError) &&
      this.signUpForm.controls[formControlName].touched
    );
  }

  passwordEquals(control: AbstractControl): { [k: string]: boolean } | null {
    if (control.get('password')?.value !== control.get('repeatPassword')?.value) {
      return { passwordEquals: true };
    }
    return null;
  }

  fixStyles(event: Event) {
    const fixInputField = this.getParentElement(event.target as HTMLElement, 3);
    const fieldSubscriptWrapper = fixInputField.querySelector('.mat-form-field-subscript-wrapper');
    if (fieldSubscriptWrapper) {
      (fieldSubscriptWrapper as HTMLElement).style.position = 'static';
      fixInputField.style.height = '52.06px';
    }
  }

  private getParentElement(elem: HTMLElement, times: number) {
    let result = elem;
    for (let i = 1; i <= times; i += 1) {
      result = result.parentElement as HTMLElement;
    }
    return result;
  }

  submit() {
    const payload = { ...this.signUpForm.value };
    delete payload.repeatPassword;
    this.store.dispatch(signUp({ payload }));
  }

  toggleHide() {
    this.hide = !this.hide;
  }

  toggleHideRepeat() {
    this.hideRepeat = !this.hideRepeat;
  }
}
