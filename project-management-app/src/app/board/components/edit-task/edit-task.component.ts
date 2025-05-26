import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { L10nLocale, L10N_LOCALE } from 'angular-l10n';
import { Languages } from 'src/app/core/constants/l10n-config';
import { PointsResponse, TaskResponse } from 'src/app/core/models/response-api.models';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';
import { loaded } from 'src/app/store/actions/notifications.actions';

export enum DialogType {
  CREATE = 'Create',
  EDIT = 'Edit',
  CREATE_RU = 'Создать',
  EDIT_RU = 'Изменить',
}

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent {
  dialogType!: DialogType;

  id = '';

  title = '';

  description = '';

  points: PointsResponse[] = [];

  editTaskForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  newPointForm: FormGroup = new FormGroup({
    point: new FormControl('', [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: { taskData: Partial<TaskResponse>; points: PointsResponse[]; type: DialogType },
    private dialogRef: MatDialogRef<ConfirmPopupComponent>,
    private dialog: MatDialog,
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    private restApi: RestApiService,
    private store: Store,
  ) {
    if (this.data) {
      this.dialogType = data.type;
      this.id = data.taskData._id || '';
      this.title = data.taskData.title || '';
      this.description = data.taskData.description || '';
      this.editTaskForm.setValue({ title: this.title, description: this.description });
      this.points.push(...this.data.points);
    }
  }

  addPoint() {
    const newPoint: Omit<PointsResponse, '_id'> = {
      title: this.newPointForm.value.point,
      taskId: this.id,
      boardId: this.data.taskData.boardId || '',
      done: false,
    };
    this.restApi.createPoint({ ...newPoint }).subscribe((res) => {
      this.points.push(res);
      this.store.dispatch(loaded());
    });
    this.newPointForm.reset();
  }

  deletePoint(event: Event) {
    const deleteBtn = event.target as HTMLElement;
    const point = deleteBtn.parentElement as HTMLElement;
    const id = point.dataset['id'] as string;
    const index = this.points.findIndex((elem) => elem._id === id);
    this.restApi.deletePointsById(id).subscribe(() => {
      this.points.splice(index, 1);
      this.store.dispatch(loaded());
    });
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
        this.dialogRef.close();
      }
    });
  }

  onConfirmClick() {
    this.dialogRef.close({
      _id: this.data.taskData._id || '',
      title: this.editTaskForm.value.title,
      order: this.data.taskData.order,
      description: this.editTaskForm.value.description,
      boardId: this.data.taskData.boardId,
      columnId: this.data.taskData.columnId,
      userId: this.data.taskData.userId,
      users: this.data.taskData.users,
      points: [...this.points],
    });
  }
}
