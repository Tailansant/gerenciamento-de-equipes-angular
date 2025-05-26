import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchState } from '../states/search.state';

export const getSearchState = createFeatureSelector<SearchState>('searchState');

export const getSearchArr = createSelector(getSearchState, (searchState) => searchState.tasks);
export const getSearchValue = createSelector(getSearchState, (searchState) => searchState.value);
