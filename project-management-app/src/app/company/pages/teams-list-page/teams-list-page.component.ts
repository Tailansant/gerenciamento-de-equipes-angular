import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Team } from 'src/app/core/models/team.model';
import * as TeamsActions from 'src/app/store/actions/teams.actions';
import * as TeamsSelectors from 'src/app/store/selectors/teams.selectors';
import * as AuthSelectors from 'src/app/store/selectors/auth.selectors';
import * as DesignersActions from 'src/app/store/actions/designers.actions'; // Para carregar designers e mostrar nomes
import * as DesignersSelectors from 'src/app/store/selectors/designers.selectors'; // Para obter designers

import { MatDialog } from '@angular/material/dialog';
import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';
import { Router } from '@angular/router';
import { filter, tap, map } from 'rxjs/operators';
import { Designer } from 'src/app/core/models/designer.model';

@Component({
    selector: 'app-teams-list-page',
    templateUrl: './teams-list-page.component.html',
    styleUrls: ['./teams-list-page.component.scss']
})
export class TeamsListPageComponent implements OnInit {
    teams$: Observable<Team[]>;
    isLoading$: Observable<boolean>;
    error$: Observable<any>;
    displayedColumns: string[] = ['name', 'description', 'designers', 'actions'];
    private userCompanyId: string | null = null;
    allDesigners: Designer[] = []; // Para mapear IDs de projetistas para nomes

    constructor(private store: Store, private dialog: MatDialog, private router: Router) {
        this.teams$ = this.store.select(TeamsSelectors.selectAllTeams);
        this.isLoading$ = this.store.select(TeamsSelectors.selectTeamsLoading);
        this.error$ = this.store.select(TeamsSelectors.selectTeamsError);

        this.store.select(DesignersSelectors.selectAllDesigners).subscribe(designers => {
            this.allDesigners = designers;
        });
    }

    ngOnInit(): void {
        this.store.select(AuthSelectors.selectUserCompanyId)
            .pipe(
                filter(companyId => !!companyId),
                tap(companyId => {
                    this.userCompanyId = companyId;
                    this.store.dispatch(TeamsActions.loadTeams({ companyId: this.userCompanyId }));
                    this.store.dispatch(DesignersActions.loadDesigners({ companyId: this.userCompanyId })); // Carrega designers para a lista
                })
            ).subscribe();
    }

    getDesignerNames(designerIds: string[]): string {
        if (!designerIds || designerIds.length === 0) {
            return 'Nenhum projetista';
        }
        return designerIds
            .map(id => this.allDesigners.find(d => d.id === id)?.name)
            .filter(name => !!name)
            .join(', ');
    }

    onEditTeam(teamId: string): void {
        this.router.navigate(['/company/teams/edit', teamId]);
    }

    onDeleteTeam(teamId: string): void {
        const dialogRef = this.dialog.open(ConfirmPopupComponent, {
            data: {
                title: 'Confirmar Exclusão',
                message: 'Tem certeza que deseja excluir esta equipe? Esta ação é irreversível.',
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.store.dispatch(TeamsActions.deleteTeam({ id: teamId }));
            }
        });
    }

    onCreateTeam(): void {
        this.router.navigate(['/company/teams/new']);
    }
}