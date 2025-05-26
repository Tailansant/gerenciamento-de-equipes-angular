import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function PasswordHasCapitalAndSmallCaseValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!/[a-z]/g.test(control.value) || !/[A-Z]/g.test(control.value)) {
      return { capitalAndSmallCase: true };
    }
    return null;
  };
}
