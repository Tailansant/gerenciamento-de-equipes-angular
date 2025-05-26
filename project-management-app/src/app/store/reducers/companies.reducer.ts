import { createReducer, on } from '@ngrx/store';
import { initialCompaniesState } from '../states/companies.state';
import * as CompaniesActions from '../actions/companies.actions';

export const companiesReducer = createReducer(
initialCompaniesState,
on(CompaniesActions.loadCompanies, state => ({
    ...state,
    loading: true,
    error: null,
})),
on(CompaniesActions.loadCompaniesSuccess, (state, { companies }) => ({
    ...state,
    companies: companies,
    loading: false,
    error: null,
})),
on(CompaniesActions.loadCompaniesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
})),
on(CompaniesActions.createCompany, state => ({
    ...state,
    loading: true,
    error: null,
})),
on(CompaniesActions.createCompanySuccess, (state, { company }) => ({
    ...state,
    companies: [...state.companies, company],
    loading: false,
    error: null,
})),
on(CompaniesActions.createCompanyFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
})),
on(CompaniesActions.updateCompany, state => ({
    ...state,
    loading: true,
    error: null,
})),
on(CompaniesActions.updateCompanySuccess, (state, { company }) => ({
    ...state,
    companies: state.companies.map(c => (c.id === company.id ? company : c)),
    loading: false,
    error: null,
})),
on(CompaniesActions.updateCompanyFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
})),
on(CompaniesActions.deleteCompany, state => ({
    ...state,
    loading: true,
    error: null,
})),
on(CompaniesActions.deleteCompanySuccess, (state, { id }) => ({
    ...state,
    companies: state.companies.filter(company => company.id !== id),
    loading: false,
    error: null,
})),
on(CompaniesActions.deleteCompanyFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
})),
on(CompaniesActions.selectCompany, (state, { companyId }) => ({
    ...state,
    selectedCompany: companyId ? state.companies.find(c => c.id === companyId) || null : null,
}))
);