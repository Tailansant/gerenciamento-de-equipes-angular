import { Component, OnDestroy, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DropResult } from 'ngx-smooth-dnd';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { L10nLocale, L10N_LOCALE } from 'angular-l10n';
import { CreateColumnComponent } from '../../components/create-column/create-column.component';
import {
  createColumn,
  initBoardState,
  setColumnsOrder,
  setColumnsOrderOnServer,
  setTasksOrderOnServer,
} from '../../../store/actions/board.actions';
import { getBoard } from '../../../store/selectors/board.selector';
import { BoardState, ColumnWithTasks } from '../../../store/states/board.state';
import { applyDrag } from '../../../core/utils/apply-drag';
import { rebindOrder } from '../../../core/utils/rebind-order';
import { Column } from '../../../core/models/column.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BoardComponent implements OnInit, OnDestroy {
  board: BoardState | undefined;

  subscription = new Subscription();

  flagOnCardDrop = { add: false, del: false };

  constructor(
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    private dialog: MatDialog,
    private store: Store,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    const subscribeToParamMap = this.activatedRoute.paramMap.subscribe((params) => {
      this.store.dispatch(initBoardState({ id: String(params.get('id')) }));
    });
    this.subscription.add(subscribeToParamMap);

    const subBoardInit = this.store.select(getBoard).subscribe((board) => {
      if (board._id.length > 0) {
        this.board = JSON.parse(JSON.stringify(board));
      }
    });
    this.subscription.add(subBoardInit);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openCreateDialog() {
    if (this.board) {
      const dialogRef = this.dialog.open(CreateColumnComponent, {
        data: {
          columnData: {
            order: this.board.columns.length,
            boardId: this.board._id,
          },
        },
      });

      const subCreateColumn = dialogRef.afterClosed().subscribe((result: Column) => {
        if (result?.boardId && result?.title.length > 0) {
          this.store.dispatch(createColumn({ column: result, boardId: result.boardId }));
        }
      });
      this.subscription.add(subCreateColumn);
    }
  }

  onColumnDrop(dropResult: DropResult) {
    if (this.board) {
      const switchedColumns = rebindOrder(applyDrag(this.board.columns, dropResult));
      this.store.dispatch(
        setColumnsOrderOnServer({
          columns: switchedColumns,
        }),
      );
      this.store.dispatch(setColumnsOrder({ columns: switchedColumns }));
    }
  }

  onCardDrop(columnId: string, dropResult: DropResult) {
    if ((dropResult.removedIndex !== null || dropResult.addedIndex !== null) && this.board) {
      const column = this.board.columns.find((item) => item._id === columnId) as ColumnWithTasks;
      column.tasks = rebindOrder(
        applyDrag(column.tasks, { ...dropResult, payload: { ...dropResult.payload, columnId } }),
      );
      if (
        (dropResult.removedIndex == null && dropResult.addedIndex !== null) ||
        (dropResult.removedIndex !== null && dropResult.addedIndex !== null)
      ) {
        this.store.dispatch(setTasksOrderOnServer({ tasks: column.tasks, newColumnId: columnId }));
        this.flagOnCardDrop.del = true;
        if (dropResult.removedIndex !== null && dropResult.addedIndex !== null) {
          this.flagOnCardDrop.add = true;
        }
      } else {
        this.flagOnCardDrop.add = true;
      }

      if (this.flagOnCardDrop.add && this.flagOnCardDrop.del) {
        this.store.dispatch(setColumnsOrder({ columns: this.board!.columns }));
        this.flagOnCardDrop.add = false;
        this.flagOnCardDrop.del = false;
      }
    }
  }

  getCardPayload(columnId: string) {
    return (index: number) => {
      return this.board!.columns.find((p) => p._id === columnId)!.tasks[index];
    };
  }
}
