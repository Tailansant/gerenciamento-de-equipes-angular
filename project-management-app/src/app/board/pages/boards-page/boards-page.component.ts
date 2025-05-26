import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CreateBoardPopupComponent } from 'src/app/shared/components/create-board-popup/create-board-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { RawBoard } from 'src/app/core/models/board.models';
import { getBoards } from '../../../store/selectors/boards.selectors';
import { createBoard, deleteBoard, initUserBoards } from '../../../store/actions/boards.actions';
import { BoardResponse } from '../../../core/models/response-api.models';
import { DELETE_BOARD, OPEN_BOARD } from '../../components/board-card/constants';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit, OnDestroy {
  isFirstLoadBoards = true;

  boards: Array<BoardResponse> = [];

  subscription = new Subscription();

  owner = 1;

  constructor(private store: Store, private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    const subBoards = this.store.select(getBoards).subscribe((boards) => {
      if (this.isFirstLoadBoards) {
        this.store.dispatch(initUserBoards());
        this.isFirstLoadBoards = false;
      }
      this.boards = boards;
    });
    this.subscription.add(subBoards);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleBoardAction(action: { type: string; id: string }) {
    if (action.type === DELETE_BOARD) {
      this.store.dispatch(deleteBoard({ boardId: action.id }));
    }
    if (action.type === OPEN_BOARD) {
      this.router.navigate(['/', 'boards', action.id]);
    }
  }

  openCreateBoard() {
    const dialogRef = this.dialog.open(CreateBoardPopupComponent);
    const subRawBoard = dialogRef.afterClosed().subscribe((rawBoard: RawBoard) => {
      if (rawBoard) {
        this.store.dispatch(createBoard({ payload: rawBoard }));
      }
    });
    this.subscription.add(subRawBoard);
  }
}
