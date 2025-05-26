import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function PasswordHasLettersAndNumbersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!/[a-z]/gi.test(control.value) || !/[0-9]/g.test(control.value)) {
      return { lettersAndNumbers: true };
    }
    return null;
  };
}
