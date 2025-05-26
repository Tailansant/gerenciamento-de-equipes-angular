import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { L10nLocale, L10N_LOCALE } from 'angular-l10n';
import { Languages } from 'src/app/core/constants/l10n-config';
import { ConfirmData } from './confirm-popup.models';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss'],
})
export class ConfirmPopupComponent {
  confirmMessage = 'Are you sure?';

  confirmDeleteMessage = 'Are you sure you want to delete this';

  confirmButtonText = 'Confirm';

  cancelButtonText = 'Cancel';

  constructor(
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    @Inject(MAT_DIALOG_DATA) private data: ConfirmData,
    private dialogRef: MatDialogRef<ConfirmPopupComponent>,
  ) {
    if (localStorage.getItem('lang') === Languages.russian) {
      this.confirmMessage = 'Вы уверены?';
      this.confirmDeleteMessage = 'Вы уверены, что хотите удалить это';
      this.confirmButtonText = 'Подтвердить';
      this.cancelButtonText = 'Отменить';
    }
    if (this.data) {
      this.confirmMessage =
        this.data.message || `${this.confirmDeleteMessage} ${this.data.itemType}?`;
    }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
