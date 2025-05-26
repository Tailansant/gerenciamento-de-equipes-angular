import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Languages } from 'src/app/core/constants/l10n-config';
import { DELETE_BOARD, OPEN_BOARD } from './constants';
import { ConfirmPopupComponent } from '../../../shared/components/confirm-popup/confirm-popup.component';
import { ItemType } from '../../../shared/components/confirm-popup/confirm-popup.models';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
})
export class BoardCardComponent implements OnDestroy {
  @Input() boardTitle =
    ' Angular Live Development Server is listening on localhost:4200, open your browser ';

  @Input() totalMembers = 0;

  @Input() boardId = '';

  @Output() boardAction = new EventEmitter<{ type: string; id: string }>();

  subscription = new Subscription();

  constructor(public dialog: MatDialog) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openBoard(event: Event) {
    const targetElement = event.target as HTMLElement;
    if (
      targetElement.tagName === 'BUTTON' ||
      (targetElement.tagName === 'MAT-ICON' &&
        !targetElement.classList.contains('total-members__icon'))
    ) {
      event.stopPropagation();
    } else {
      this.boardAction.emit({ type: OPEN_BOARD, id: this.boardId });
    }
  }

  deleteBoard() {
    let itemTypeSelected = ItemType.board;
    if (localStorage.getItem('lang') === Languages.russian) {
      itemTypeSelected = ItemType.board_RU;
    }
    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      data: {
        itemType: itemTypeSelected,
      },
    });

    const subConfirm = dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.boardAction.emit({ type: DELETE_BOARD, id: this.boardId });
      }
    });
    this.subscription.add(subConfirm);
  }
}
