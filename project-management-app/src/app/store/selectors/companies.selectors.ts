import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../state.models';
import { CompaniesState } from '../states/companies.state';

export const selectCompaniesState = createFeatureSelector<AppState, CompaniesState>('companies');

export const selectAllCompanies = createSelector(
selectCompaniesState,
(state: CompaniesState) => state.companies
);

export const selectCompaniesLoading = createSelector(
selectCompaniesState,
(state: CompaniesState) => state.loading
);

export const selectCompaniesError = createSelector(
selectCompaniesState,
(state: CompaniesState) => state.error
);

export const selectSelectedCompany = createSelector(
selectCompaniesState,
(state: CompaniesState) => state.selectedCompany
);