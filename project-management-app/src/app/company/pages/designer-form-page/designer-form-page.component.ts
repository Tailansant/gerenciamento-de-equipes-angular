import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { Designer } from 'src/app/core/models/designer.model';
import * as DesignersActions from 'src/app/store/actions/designers.actions';
import * as DesignersSelectors from 'src/app/store/selectors/designers.selectors';
import * as AuthSelectors from 'src/app/store/selectors/auth.selectors';
import { filter, take, map } from 'rxjs/operators';

@Component({
    selector: 'app-designer-form-page',
    templateUrl: './designer-form-page.component.html',
    styleUrls: ['./designer-form-page.component.scss']
})
export class DesignerFormPageComponent implements OnInit, OnDestroy {
    designerForm!: FormGroup;
    isEditMode: boolean = false;
    designerId: string | null = null;
    isLoading$: Observable<boolean>;
    error$: Observable<any>;
    private userCompanyId: string | null = null;
    private sub: Subscription | null = null;

    constructor(
        private fb: FormBuilder,
        private store: Store,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.isLoading$ = this.store.select(DesignersSelectors.selectDesignersLoading);
        this.error$ = this.store.select(DesignersSelectors.selectDesignersError);
    }

    ngOnInit(): void {
        this.designerId = this.route.snapshot.paramMap.get('id');
        this.isEditMode = !!this.designerId;

        this.initForm();

        this.sub = combineLatest([
            this.store.select(AuthSelectors.selectUserCompanyId),
            this.store.select(DesignersSelectors.selectAllDesigners) // Assumimos que os designers já estão carregados para a empresa
        ])
            .pipe(
                filter(([companyId, designers]) => !!companyId), // Garante que companyId existe
                map(([companyId, designers]) => {
                    this.userCompanyId = companyId;
                    if (this.isEditMode && this.designerId) {
                        return designers.find(d => d.id === this.designerId);
                    }
                    return null;
                }),
                take(1) // Pega o primeiro valor e completa
            )
            .subscribe(designer => {
                if (this.isEditMode && designer) {
                    this.designerForm.patchValue(designer);
                } else if (this.isEditMode && !designer) {
                    console.warn('Projetista não encontrado para edição:', this.designerId);
                    this.router.navigate(['/company/designers']);
                }
            });

        // Se estiver criando, o companyId do usuário já estará no formulário
        this.store.select(AuthSelectors.selectUserCompanyId).pipe(
            filter(companyId => !!companyId),
            take(1)
        ).subscribe(companyId => {
            if (!this.isEditMode) {
                this.designerForm.patchValue({ companyId: companyId });
            }
        });
    }

    initForm(): void {
        this.designerForm = this.fb.group({
            id: [''], // ID é apenas para edição
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            specialty: ['', Validators.required],
            companyId: ['', Validators.required] // Campo hidden ou preenchido automaticamente
        });
    }

    onSubmit(): void {
        if (this.designerForm.valid) {
            const designer: Designer = this.designerForm.value;
            if (this.isEditMode && this.designerId) {
                this.store.dispatch(DesignersActions.updateDesigner({ id: this.designerId, designer }));
            } else {
                this.store.dispatch(DesignersActions.createDesigner({ designer }));
            }
        }
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
        this.store.dispatch(DesignersActions.selectDesigner({ designerId: null }));
    }
}