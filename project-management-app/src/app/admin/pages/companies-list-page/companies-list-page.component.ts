import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Company } from 'src/app/core/models/company.model';
import * as CompaniesActions from 'src/app/store/actions/companies.actions';
import * as CompaniesSelectors from 'src/app/store/selectors/companies.selectors';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-companies-list-page',
    templateUrl: './companies-list-page.component.html',
    styleUrls: ['./companies-list-page.component.scss']
})
export class CompaniesListPageComponent implements OnInit {
    companies$: Observable<Company[]>;
    isLoading$: Observable<boolean>;
    error$: Observable<any>;
    displayedColumns: string[] = ['name', 'cnpj', 'address', 'actions']; // Colunas da tabela

    constructor(private store: Store, private dialog: MatDialog, private router: Router) {
      this.companies$ = this.store.select(CompaniesSelectors.selectAllCompanies as any);
      this.isLoading$ = this.store.select(CompaniesSelectors.selectCompaniesLoading as any);
      this.error$ = this.store.select(CompaniesSelectors.selectCompaniesError as any);
    }

    ngOnInit(): void {
        this.store.dispatch(CompaniesActions.loadCompanies());
    }

    onEditCompany(companyId: string): void {
        this.router.navigate(['/admin/companies/edit', companyId]);
    }

    onDeleteCompany(companyId: string): void {
        const dialogRef = this.dialog.open(ConfirmPopupComponent, {
            data: {
                title: 'Confirmar Exclusão',
                message: 'Tem certeza que deseja excluir esta empresa? Esta ação é irreversível.',
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.store.dispatch(CompaniesActions.deleteCompany({ id: companyId }));
            }
        });
    }

    onCreateCompany(): void {
        this.router.navigate(['/admin/companies/new']);
    }
}
