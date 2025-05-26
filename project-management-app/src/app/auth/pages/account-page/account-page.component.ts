import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AUTH_STATE } from 'src/app/core/constants/constants';
import { Languages } from 'src/app/core/constants/l10n-config';
import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';
import { deleteUser, updateUserData } from 'src/app/store/actions/auth.actions';
import { AuthState } from 'src/app/store/states/auth.state';
import { PasswordHasCapitalAndSmallCaseValidator } from '../../directives/password-has-capital-and-small-case.directive';
import { PasswordHasLettersAndNumbersValidator } from '../../directives/password-has-letters-and-numbers.directive';
import { PasswordHasSpecialCharacterValidator } from '../../directives/password-has-special-character.directive';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
})
export class AccountPageComponent implements OnInit {
  userData: Omit<AuthState, 'responseMessage'> = {
    ...JSON.parse(localStorage.getItem(AUTH_STATE) as string),
  };

  hide = true;

  editProfileForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(32)]),
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      PasswordHasCapitalAndSmallCaseValidator(),
      PasswordHasLettersAndNumbersValidator(),
      PasswordHasSpecialCharacterValidator(),
    ]),
  });

  constructor(
    private dialogRef: MatDialogRef<ConfirmPopupComponent>,
    private dialog: MatDialog,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.editProfileForm.setValue({
      name: this.userData.name || '',
      login: this.userData.login || '',
      password: '',
    });
  }

  openConfirmationDialogExit() {
    let discardMessage = 'Are you sure want to discard changes?';
    if (localStorage.getItem('lang') === Languages.russian) {
      discardMessage = 'Вы уверены, что хотите отменить изменения?';
    }
    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      data: {
        message: discardMessage,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.editProfileForm.setValue({
          name: this.userData.name,
          login: this.userData.login,
          password: '',
        });
      }
    });
  }

  openConfirmationDialogSave() {
    let saveMessage = 'Are you sure want to save changes?';
    if (localStorage.getItem('lang') === Languages.russian) {
      saveMessage = 'Вы уверены, что хотите сохранить изменения?';
    }
    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      data: {
        message: saveMessage,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.saveChanges();
      }
    });
  }

  openConfirmationDialogDelete() {
    let deleteMessage = 'Are you sure want to delete user?';
    if (localStorage.getItem('lang') === Languages.russian) {
      deleteMessage = 'Вы уверены, что хотите удалить пользователя?';
    }
    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      data: {
        message: deleteMessage,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteUser();
      }
    });
  }

  toggleHide() {
    this.hide = !this.hide;
  }

  saveChanges() {
    const credentials = {
      name: this.editProfileForm.value.name,
      login: this.editProfileForm.value.login,
      password: this.editProfileForm.value.password,
    };
    this.store.dispatch(updateUserData({ payload: { credentials, id: this.userData.id || '' } }));
  }

  deleteUser() {
    this.store.dispatch(deleteUser({ payload: { id: this.userData.id as string } }));
  }
}
