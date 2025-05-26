import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { Designer } from 'src/app/core/models/designer.model';
import * as DesignersActions from 'src/app/store/actions/designers.actions';
import * as DesignersSelectors from 'src/app/store/selectors/designers.selectors';
import * as AuthSelectors from 'src/app/store/selectors/auth.selectors';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';
import { Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';

@Component({
    selector: 'app-designers-list-page',
    templateUrl: './designers-list-page.component.html',
    styleUrls: ['./designers-list-page.component.scss']
})
export class DesignersListPageComponent implements OnInit {
    designers$: Observable<Designer[]>;
    isLoading$: Observable<boolean>;
    error$: Observable<any>;
    displayedColumns: string[] = ['name', 'email', 'specialty', 'actions'];
    private userCompanyId: string | null = null;

    constructor(private store: Store, private dialog: MatDialog, private router: Router) {
        this.designers$ = this.store.select(DesignersSelectors.selectAllDesigners);
        this.isLoading$ = this.store.select(DesignersSelectors.selectDesignersLoading);
        this.error$ = this.store.select(DesignersSelectors.selectDesignersError);
    }

    ngOnInit(): void {
        this.store.select(AuthSelectors.selectUserCompanyId)
            .pipe(
                filter(companyId => !!companyId), // Garante que companyId não é nulo
                tap(companyId => {
                    this.userCompanyId = companyId;
                    this.store.dispatch(DesignersActions.loadDesigners({ companyId: this.userCompanyId }));
                })
            ).subscribe();
    }

    onEditDesigner(designerId: string): void {
        this.router.navigate(['/company/designers/edit', designerId]);
    }

    onDeleteDesigner(designerId: string): void {
        const dialogRef = this.dialog.open(ConfirmPopupComponent, {
            data: {
                title: 'Confirmar Exclusão',
                message: 'Tem certeza que deseja excluir este projetista? Esta ação é irreversível.',
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.store.dispatch(DesignersActions.deleteDesigner({ id: designerId }));
            }
        });
    }

    onCreateDesigner(): void {
        this.router.navigate(['/company/designers/new']);
    }
}