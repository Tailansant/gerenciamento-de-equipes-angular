import { Component, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { L10nLocale, L10N_LOCALE } from 'angular-l10n';
import { RawBoard } from '../../../core/models/board.models';
import { RestApiService } from '../../../core/services/rest-api.service';
import { UserResponse } from '../../../core/models/response-api.models';
import { loaded } from '../../../store/actions/notifications.actions';

@Component({
  selector: 'app-create-board-popup',
  templateUrl: './create-board-popup.component.html',
  styleUrls: ['./create-board-popup.component.scss'],
})
export class CreateBoardPopupComponent implements OnDestroy {
  addOnBlur = true;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  members: Array<string> = [];

  users: Array<UserResponse> = [];

  subscription = new Subscription();

  userStatus = { exist: true, name: '' };

  boardForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<CreateBoardPopupComponent>,
    private restApiService: RestApiService,
    private store: Store,
    @Inject(L10N_LOCALE) public locale: L10nLocale,
  ) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      if (this.users.length === 0) {
        const subUsers = this.restApiService.getUsers().subscribe((users) => {
          this.users = users;
          this.store.dispatch(loaded());
          this.checkUser(value);
          this.addToMembers(value);
        });
        this.subscription.add(subUsers);
      } else {
        this.checkUser(value);
        this.addToMembers(value);
      }
    }

    event.chipInput!.clear();
  }

  remove(member: string): void {
    const index = this.members.indexOf(member);

    if (index >= 0) {
      this.members.splice(index, 1);
    }
  }

  getInputResults(): RawBoard {
    return { name: this.boardForm.get('name')?.value as string, members: this.members };
  }

  private checkUser(userLogin: string): void {
    this.userStatus = {
      exist: !!this.users.find((user) => user.login === userLogin),
      name: userLogin,
    };
  }

  private addToMembers(userLogin: string): void {
    if (this.userStatus.exist) {
      this.members.push(userLogin);
    }
  }
}
