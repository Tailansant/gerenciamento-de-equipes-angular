import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { TaskResponse } from 'src/app/core/models/response-api.models';
import { getSearchArr, getSearchValue } from 'src/app/store/selectors/search.selectors';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  store$!: Observable<TaskResponse[] | null>;

  searchValue: string | null = '';

  subscription = new Subscription();

  constructor(public store: Store) {}

  ngOnInit(): void {
    this.store$ = this.store.select(getSearchArr);
    const subSearchValue = this.store.select(getSearchValue).subscribe((value) => {
      this.searchValue = value;
    });
    this.subscription.add(subSearchValue);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
