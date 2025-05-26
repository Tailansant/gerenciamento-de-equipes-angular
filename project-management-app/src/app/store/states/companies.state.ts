import { Company } from 'src/app/core/models/company.model';

export interface CompaniesState {
companies: Company[];
loading: boolean;
error: any;
selectedCompany: Company | null;
}

export const initialCompaniesState: CompaniesState = {
companies: [],
loading: false,
error: null,
selectedCompany: null,
};