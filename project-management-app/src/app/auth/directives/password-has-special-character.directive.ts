import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function PasswordHasSpecialCharacterValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!/[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g.test(control.value)) {
      return { specialCharacter: true };
    }
    return null;
  };
}
