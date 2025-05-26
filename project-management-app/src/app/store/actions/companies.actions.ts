import { createAction, props } from '@ngrx/store';
import { Company } from '../../core/models/company.model';

export const loadCompanies = createAction(
'[Companies API] Load Companies'
);

export const loadCompaniesSuccess = createAction(
'[Companies API] Load Companies Success',
props<{ companies: Company[] }>()
);

export const loadCompaniesFailure = createAction(
'[Companies API] Load Companies Failure',
props<{ error: any }>()
);

export const createCompany = createAction(
'[Companies Page] Create Company',
props<{ company: Company }>()
);

export const createCompanySuccess = createAction(
'[Companies API] Create Company Success',
props<{ company: Company }>()
);

export const createCompanyFailure = createAction(
'[Companies API] Create Company Failure',
props<{ error: any }>()
);

export const updateCompany = createAction(
'[Companies Page] Update Company',
props<{ id: string; company: Company }>()
);

export const updateCompanySuccess = createAction(
'[Companies API] Update Company Success',
props<{ company: Company }>()
);

export const updateCompanyFailure = createAction(
'[Companies API] Update Company Failure',
props<{ error: any }>()
);

export const deleteCompany = createAction(
'[Companies Page] Delete Company',
props<{ id: string }>()
);

export const deleteCompanySuccess = createAction(
'[Companies API] Delete Company Success',
props<{ id: string }>()
);

export const deleteCompanyFailure = createAction(
'[Companies API] Delete Company Failure',
props<{ error: any }>()
);

export const selectCompany = createAction(
'[Companies Page] Select Company',
props<{ companyId: string | null }>()
);