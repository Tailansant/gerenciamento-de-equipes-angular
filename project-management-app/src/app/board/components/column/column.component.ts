import { Component, Input, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TaskResponse } from 'src/app/core/models/response-api.models';
import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';
import { Store } from '@ngrx/store';
import { Languages } from 'src/app/core/constants/l10n-config';
import { L10nLocale, L10N_LOCALE } from 'angular-l10n';
import { DialogType, EditTaskComponent } from '../edit-task/edit-task.component';
import { ColumnWithTasks } from '../../../store/states/board.state';
import {
  createTaskOnServer,
  deleteColumnOnServer,
  updateColumnOnServer,
} from '../../../store/actions/board.actions';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input() columnData!: ColumnWithTasks;

  editMode = false;

  editTitleForm: FormGroup = new FormGroup({
    columnTitle: new FormControl(this.columnData ? this.columnData.title : '', [
      Validators.required,
    ]),
  });

  constructor(
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    private dialog: MatDialog,
    private store: Store,
  ) {}

  turnOnEditMode() {
    this.editMode = true;
  }

  openConfirmationDialog() {
    let exitMessage = 'Are you sure want to exit without saving changes?';
    if (localStorage.getItem('lang') === Languages.russian) {
      exitMessage = 'Вы уверены, что хотите выйти без сохранения изменений?';
    }
    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      data: {
        message: exitMessage,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        dialogRef.close();
        this.editMode = false;
      }
    });
  }

  openCreateDialog() {
    let typeSelected = DialogType.CREATE;
    if (localStorage.getItem('lang') === Languages.russian) {
      typeSelected = DialogType.CREATE_RU;
    }

    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: {
        taskData: {
          order: this.columnData.tasks.length,
          boardId: this.columnData.boardId,
          columnId: this.columnData._id,
          userId: 0,
          users: [],
        },
        points: [],
        type: typeSelected,
      },
    });

    dialogRef.afterClosed().subscribe((result: TaskResponse) => {
      if (result) {
        this.store.dispatch(
          createTaskOnServer({
            task: {
              title: result.title,
              order: result.order,
              description: result.description,
              userId: result.userId,
              users: result.users,
            },
            boardId: result.boardId,
            columnId: result.columnId,
          }),
        );
      }
    });
  }

  saveColumnTitle() {
    this.columnData.title = this.editTitleForm.value.columnTitle;
    this.store.dispatch(updateColumnOnServer({ column: this.columnData }));
    this.editMode = false;
  }

  handleDeleteColumn() {
    let deleteMessage = 'Are you sure want delete column?';
    if (localStorage.getItem('lang') === Languages.russian) {
      deleteMessage = 'Вы уверены, что хотите удалить столбец?';
    }

    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      data: {
        message: deleteMessage,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.store.dispatch(deleteColumnOnServer({ column: this.columnData }));
        dialogRef.close();
      }
    });
  }
}
