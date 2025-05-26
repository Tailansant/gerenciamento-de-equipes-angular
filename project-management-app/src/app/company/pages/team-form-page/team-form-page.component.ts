import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { Team } from 'src/app/core/models/team.model';
import { Designer } from 'src/app/core/models/designer.model';
import * as TeamsActions from 'src/app/store/actions/teams.actions';
import * as TeamsSelectors from 'src/app/store/selectors/teams.selectors';
import * as DesignersActions from 'src/app/store/actions/designers.actions';
import * as DesignersSelectors from 'src/app/store/selectors/designers.selectors';
import * as AuthSelectors from 'src/app/store/selectors/auth.selectors';
import { filter, take, map, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-team-form-page',
    templateUrl: './team-form-page.component.html',
    styleUrls: ['./team-form-page.component.scss']
})
export class TeamFormPageComponent implements OnInit, OnDestroy {
    teamForm!: FormGroup;
    isEditMode: boolean = false;
    teamId: string | null = null;
    isLoading$: Observable<boolean>;
    error$: Observable<any>;
    availableDesigners$: Observable<Designer[]>; // Projetistas disponíveis para seleção
    private userCompanyId: string | null = null;
    private sub: Subscription | null = null;

    constructor(
        private fb: FormBuilder,
        private store: Store,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.isLoading$ = this.store.select(TeamsSelectors.selectTeamsLoading);
        this.error$ = this.store.select(TeamsSelectors.selectTeamsError);
        this.availableDesigners$ = this.store.select(DesignersSelectors.selectAllDesigners);
    }

    ngOnInit(): void {
        this.teamId = this.route.snapshot.paramMap.get('id');
        this.isEditMode = !!this.teamId;

        this.initForm();

        // Carrega os designers disponíveis para a empresa do usuário logado
        this.store.select(AuthSelectors.selectUserCompanyId)
            .pipe(
                filter(companyId => !!companyId),
                take(1) // Pega o companyId uma vez
            ).subscribe(companyId => {
                this.userCompanyId = companyId;
                this.store.dispatch(DesignersActions.loadDesigners({ companyId: this.userCompanyId }));

                // Se estiver criando, preenche o companyId da equipe automaticamente
                if (!this.isEditMode) {
                    this.teamForm.patchValue({ companyId: this.userCompanyId });
                }
            });


        if (this.isEditMode && this.teamId) {
            this.sub = combineLatest([
                this.store.select(TeamsSelectors.selectAllTeams),
                this.store.select(AuthSelectors.selectUserCompanyId)
            ])
                .pipe(
                    filter(([teams, companyId]) => !!companyId), // Garante que companyId existe
                    map(([teams, companyId]) => {
                        this.userCompanyId = companyId; // Garante que companyId está disponível
                        return teams.find(t => t.id === this.teamId);
                    }),
                    take(1)
                )
                .subscribe(team => {
                    if (team) {
                        this.teamForm.patchValue(team);
                        // Certifique-se de que o valor de designerIds é um array de strings para o select
                        this.teamForm.get('designerIds')?.patchValue(team.designerIds || []);
                    } else {
                        console.warn('Equipe não encontrada para edição:', this.teamId);
                        this.router.navigate(['/company/teams']);
                    }
                });
        }
    }

    initForm(): void {
        this.teamForm = this.fb.group({
            id: [''],
            name: ['', Validators.required],
            description: ['', Validators.required],
            companyId: ['', Validators.required],
            designerIds: [[] as string[], Validators.required] // Array de IDs de projetistas
        });
    }

    onSubmit(): void {
        if (this.teamForm.valid) {
            const team: Team = this.teamForm.value;
            if (this.isEditMode && this.teamId) {
                this.store.dispatch(TeamsActions.updateTeam({ id: this.teamId, team }));
            } else {
                this.store.dispatch(TeamsActions.createTeam({ team }));
            }
        }
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
        this.store.dispatch(TeamsActions.selectTeam({ teamId: null }));
    }
}