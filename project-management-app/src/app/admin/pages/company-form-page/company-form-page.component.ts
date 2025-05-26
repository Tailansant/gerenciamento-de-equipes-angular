import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Company } from 'src/app/core/models/company.model';
import * as CompaniesActions from 'src/app/store/actions/companies.actions';
import * as CompaniesSelectors from 'src/app/store/selectors/companies.selectors';
import { take } from 'rxjs/operators'; // Para pegar o valor uma única vez

@Component({
    selector: 'app-company-form-page',
    templateUrl: './company-form-page.component.html',
    styleUrls: ['./company-form-page.component.scss']
})
export class CompanyFormPageComponent implements OnInit, OnDestroy {
    companyForm!: FormGroup;
    isEditMode: boolean = false;
    companyId: string | null = null;
    isLoading$: Observable<boolean>;
    error$: Observable<any>;
    private sub: Subscription | null = null;

    constructor(
        private fb: FormBuilder,
        private store: Store,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.isLoading$ = this.store.select(CompaniesSelectors.selectCompaniesLoading);
        this.error$ = this.store.select(CompaniesSelectors.selectCompaniesError);
    }

    ngOnInit(): void {
        this.companyId = this.route.snapshot.paramMap.get('id');
        this.isEditMode = !!this.companyId;

        this.initForm();

        if (this.isEditMode && this.companyId) {
            this.store.dispatch(CompaniesActions.selectCompany({ companyId: this.companyId }));
            this.sub = this.store.select(CompaniesSelectors.selectSelectedCompany)
                .pipe(take(1)) // Pega o valor atual e se desinscreve
                .subscribe(company => {
                    if (company) {
                        this.companyForm.patchValue(company);
                    } else {
                        // Se não encontrou a empresa, talvez carregar ou redirecionar
                        console.warn('Empresa não encontrada para edição:', this.companyId);
                        this.router.navigate(['/admin/companies']); // Redireciona de volta
                    }
                });
        }
    }

    initForm(): void {
        this.companyForm = this.fb.group({
            id: [''], // ID é apenas para edição, será gerado no backend para criação
            name: ['', Validators.required],
            cnpj: ['', [Validators.required, Validators.pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/)]], // Exemplo de regex para CNPJ
            address: ['', Validators.required],
            // Adicione outros campos conforme o modelo Company
        });
    }

    onSubmit(): void {
        if (this.companyForm.valid) {
            const company: Company = this.companyForm.value;
            if (this.isEditMode && this.companyId) {
                this.store.dispatch(CompaniesActions.updateCompany({ id: this.companyId, company }));
            } else {
                this.store.dispatch(CompaniesActions.createCompany({ company }));
            }
        }
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
        // Limpa a empresa selecionada no estado ao sair
        this.store.dispatch(CompaniesActions.selectCompany({ companyId: null }));
    }
}